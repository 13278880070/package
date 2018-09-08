import java.io.IOException;
import java.io.FileReader;
import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.List;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.fs.FileSystem;

// javac -classpath /opt/hadoop/myjar/hadoop-core-1.2.1.jar:/opt/hadoop/myjar/commons-cli-1.2.jar -d matrix_class/ MR2.java

public class MR2{
// Mapper2 类
	public static class Mapper2 extends Mapper<LongWritable,Text,Text,Text>{
		private Text outKey = new Text();
		private Text outValue = new Text();

		private List<String> cacheList = new ArrayList<String>();
		// 存储与其相乘矩阵的每一行数据
		// setup 类
		protected void setup(Context context) throws IOException,InterruptedException{
			super.setup(context);
			// 通过输入流将全局缓冲中的右侧矩阵读入 List<String>
			FileReader fr = new FileReader("input/multi_file1");
			BufferedReader bf = new BufferedReader(fr);

			// 每一行格式  行 tab 列_值,列_值,....
			String line = null;
			while((line = bf.readLine())!=null){
				cacheList.add(line);
			}
			fr.close();
			bf.close();
		}

		// map 类
		// key : 行号
		// value : 行 tab 列_值,列_值,....
		protected void map(LongWritable key,Text value,Context context) throws IOException,InterruptedException{
			// 行
			String row_matrix1 = value.toString().split("\t")[0];
			// 列_值 (数组)
			String[] column_value_array_matrix1 = value.toString().split("\t")[1].split(",");
			for(String line:cacheList){
				// 转置矩阵的行
				String row_matrix2 = line.toString().split("\t")[0];
				String[] column_value_array_matrix2 = line.toString().split("\t")[1].split(",");


				// 两个矩阵相乘得到结果
				int result = 0;
				// 遍历原矩阵的第一行每一列  1
				for(String column_value_matrix1:column_value_array_matrix1){
					// 对于每一个 列_值
					String column_matrix1 = column_value_matrix1.split("_")[0];
					String value_matrix1 = column_value_matrix1.split("_")[1];
					// 遍历转置矩阵的第一行每一列   2
					for(String column_value_matrix2:column_value_array_matrix2){
						if(column_value_matrix2.startsWith(column_matrix1+"_")){
							// 转置后的矩阵无序  需要匹配 "_" 前的列号才能相乘
							String value_matrix2 = column_value_matrix2.split("_")[1];
							// 两列的值相乘 并累加
							result += Integer.valueOf(value_matrix1)*Integer.valueOf(value_matrix2);
						}
					}
				}
				// result  得到新矩阵
				outKey.set(row_matrix1);//  行
				outValue.set(row_matrix2+"_"+result);//   列_值
				context.write(outKey,outValue);
			}
		}
	}
// Reducer2 类
	public static class Reducer2 extends Reducer<Text,Text,Text,Text>{
		private Text outKey = new Text();
		private Text outValue = new Text();
		// reduce 类
		protected void reduce(Text key,Iterable<Text> values,Context context) throws IOException,InterruptedException{
			StringBuilder sb = new StringBuilder();
			for(Text text:values){
				// text : 列_值
				sb.append(text+",");
			}
			String line = null;
			if(sb.toString().endsWith(",")){
				line = sb.substring(0,sb.length()-1);
			}

			// 设置输出 key  value
			outKey.set(key);
			outValue.set(line);
			// 进行输出
			context.write(outKey,outValue);
		}
	}

	// 定义文件输入 输出 hdfs地址

	// 输入文件路径
	private static String inPath = "matrix_multi/input";
	// 输出文件路径
	private static String outPath = "matrix_multi/output";
	// hdfs 地址
	private static String hdfs = "hdfs://localhost:9000";

// 程序运行的类
	public int run(){
		try{
			// 创建job配置类
			Configuration conf = new Configuration();

			// 设置hdfs的地址
			conf.set("fs.defaultFS",hdfs);

			Job job = new Job(conf);

			// job相关设置
			// 设置主类
			job.setJarByClass(MR2.class);
			// 设置输出类型
			job.setOutputKeyClass(Text.class);
			job.setOutputValueClass(Text.class);

			// 设置Mapper 类  Reducer类
			job.setMapperClass(Mapper2.class);
			job.setReducerClass(Reducer2.class);

			job.setInputFormatClass(TextInputFormat.class);

			
			FileSystem fs = FileSystem.get(conf);
			// 设置输入路径
			Path inputPath = new Path(inPath);
			if(fs.exists(inputPath)){	// 判断路径是否存在
				FileInputFormat.addInputPath(job,inputPath);
			}
			// 设置输出路径
			Path outputPath = new Path(outPath);
			fs.delete(outputPath,true);
			FileOutputFormat.setOutputPath(job,outputPath);

			return job.waitForCompletion(true)? 1:-1;


		} catch(IOException e){
			e.printStackTrace();
		} catch(ClassNotFoundException e){
			e.printStackTrace();
		} catch(InterruptedException e){
			e.printStackTrace();
		}
		return -1;
	}

	public static void main(String[] args) {
		int result = -1;
		result = new MR2().run();
		if(result==-1){
			System.out.println("step2 运行失败");
		}else {
			System.out.println("step2 运行成功");
		}
	}
}