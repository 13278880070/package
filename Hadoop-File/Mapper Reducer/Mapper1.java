import java.io.IOException;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

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