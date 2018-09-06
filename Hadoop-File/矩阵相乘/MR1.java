import java.io.IOException;
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

public class MR1{
// Mapper1  类
	public class Mapper1 extends Mapper<LongWritable,Text,Text,Text>{

		private Text outKey = new Text();
		private Text outValue = new Text();

	// 重写 map 方法
		/**
		*key : 	1 ...行号
		*value : 1	1_0,2_3,3_-1,4_2,5_-3		某一行
		*/
		@Override
		protected void map(LongWritable key,Text value,Context context)
			throws IOException,InterruptedException{
				String[] rowAndLine = value.toString().split("\t");
				String row = rowAndLine[0];		//行号: 第0个元素   
				String[] lines = rowAndLine[1].split(",");
				// 调用split方法   分隔符为 ","

				// 下面是对矩阵进行转置
				// lines[0]   ["1_0","2_3","3_-1","4_2","5_-3"]
				for(int i=0;i<lines.length;i++){
					String column = lines[i].split("_")[0];
					String valueStr = lines[i].split("_")[1];
					// 要输出的 key : 列号   value ： 行号_值
					outKey.set(column);
					outValue.set(row+"_"+valueStr);	//原矩阵的行号作为 新矩阵的列号

					context.write(outKey,outValue);
				}
			}
	}
// Reducer1 类
	public class Reducer1 extends Reducer<Text,Text,Text,Text>{

		private Text outKey = new Text();
		private Text outValue = new Text();
		// 要输出的key value

		@Override
		// key : 列号 		value : [行号_值,行号_值,行号_值,行号_值..]
		protected void reduce(Text key,Iterable<Text> values,Context context)
			throws IOException,InterruptedException{
				StringBuilder sb = new StringBuilder();
				for(Text text:values){
					// text : "行号_值"
					sb.append(text+",");
				}
				String line = null;
				if(sb.toString().endsWith(",")){
					line = sb.substring(0,sb.length()-1);
				}

				// 设置输出的 key
				outKey.set(key);
				outValue.set(line);

				// 进行输出
				context.write(outKey,outValue);
			}
	}




	// 定义文件输入 输出 hdfs地址

	// 输入文件路径
	private static String inPath = "";
	// 输出文件路径
	private static String outPath = "";
	// hdfs 地址
	private static String hdfs = "hdfs://";

	public int run(){
		try{
			// 创建job配置类
			Configuration conf = new Configuration();
			// 设置hdfs的地址
			conf.set("fs.defaultFS",hdfs);
			// 创建一个job实例  执行作业
			Job job = Job.getInstance(conf,"step1");

			// 设置job 的主类
			job.setJarByClass(MR1.class);
			// 设置mapper reducer类
			job.setJarByClass(Mapper1.class);
			job.setJarByClass(Reducer1.class);

			// 设置mapper 输出类型
			job.setMapOutputKeyClass(Text.class);
			job.setMapOutputValueClass(Text.class);

			// 设置Reducer 输出类型
			job.setOutputKeyClass(Text.class);
			job.setOutputValueClass(Text.class);

			// 设置输入  路径
			FileSystem fs = FileSystem.get(conf);
			Path inputPath = new Path(inPath);
			// 判断路径是否存在
			if (fs.exists(inputPath)){
				FileInputFormat.addInputPath(job,inputPath);
			}
			// 设置输出路径
			Path outputPath = new Path(outPath);
			fs.delete(outPath,true);

			FileOutputFormat.setOutputPath(job,outputPath);

			// 返回作业运行的状态
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

	public static void main(String[] args){
		int result = -1;
		result = new MR1().run();
		if(result==1){
			System.out.println("step1 运行成功");
		}else {
			System.out.println("step1 运行失败");
		}
	}
}