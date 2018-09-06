import java.io.IOException
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Partitioner

import org.apache.hadoop.util.GenericOptionsParser;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;


public class Sort{
	// map 将输入的value 化成 IntWritable 类型, 作为输出的key
	public static class Map extends Mapper<Object,Text,IntWritable,IntWritable>{
		private static IntWritable data=new IntWritable();

		// 实现map函数
		public void map(Object key,Text value,Context context)
		throws IOException,InterruptedException{
			String line = value.toString();
			// 依次读取每一行
			// 再将数字转化为整数
			data.set(Integer.parseInt(line));
			context.write(data,new IntWritable(1));
		}
	}

	// reduce 将输入的key 复制到输出数据的key上
	// 然后根据输入的value-list 中元素个数 决定key的输出次数
	// 用全局 linenum 代表key的位次
	public static class Reduce extends Reducer<IntWritable,IntWritable,IntWritable,IntWritable>{
		private static IntWritable linenum = new IntWritable(1);
		// linenum  表示第几行 即次序  每写一行linenum++
		// 实现reduce 函数
		public void reduce(IntWritable key,Iterable<IntWritable> values,Context context)
		throws IOException,InterruptedException{
			for(IntWritable val:values){
				context.write(linenum,key);
				linenum = new IntWritable(linenum.get()+1);
			}
		}
	}
	// 自己定义 Partition  划分区间
	public static class Partition extends Partitioner<IntWritable,IntWritable>{
		@Override
		public int getPartition(IntWritable key,IntWritable value,int numPartitions){
			int MaxNumber = 65223;
			int bound = MaxNumber / numPartitions + 1;
			// 最大值除以 分区
			int keynumber = key.get();
			for (int i=0;i<numPartitions;i++){
				if(keynumber<bound * i && keynumber >= bound * (i-1))
					return i - 1;
			}
			return 0;
		}
	}

	public static void main(String[] args) throws Exception{
		Configuration conf = new Configuration();
		String[] ioArgs=new String[]{"sort_in","sort_out"};
		String[] otherArgs=new GenericOptionsParser(conf,ioArgs).getRemainingArgs();
		if (otherArgs.length!=2){
			System.err.println("Usage: Data Sort <in> <out>");
			System.exit(2);
		}
		Job job = new Job(conf,"Data Sort");
		job.setJarByClass(Sort.class);
		// 设置Map 和 Reduce 处理类
		job.setMapperClass(Map.class);
	}
}