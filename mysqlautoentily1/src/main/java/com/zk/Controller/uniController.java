package com.zk.Controller;

import com.zk.dao.UniMapper;
import com.zk.entity.Uni;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by MACHENIKE on 2018/8/7 0007.
 */
@RestController
@RequestMapping("/uni")
public class uniController {
    @Autowired
    UniMapper uniMapper;   //表操作接口变量的对象实现


    //查询数据
    @RequestMapping("/query/{id}")
    public Uni getcontent(@PathVariable("id") Integer id){
        return uniMapper.selectByPrimaryKey(id);
    }

    //添加数据
    @RequestMapping("/add/{Name}/{Sheng}/{Score}")
    public int addit(@PathVariable("Name") String name,@PathVariable("Sheng") String sheng,@PathVariable("Score") Float score){
        Uni uni=new Uni();
        uni.setScore(score);
        uni.setSheng(sheng);
        uni.setName(name);
        return uniMapper.insert(uni);
    }

    //删除数据
    @RequestMapping("/remove/{id}")
    public int rmove(@PathVariable("id") Integer id){
        Uni uni=uniMapper.selectByPrimaryKey(id);
        if(uni!=null) return uniMapper.deleteByPrimaryKey(id);
        else return -1;
    }

    //修改数据1
    @RequestMapping("/update1/{id}/{Name}/{Sheng}/{Score}")
    public int update(@PathVariable("id") Integer id,@PathVariable("Name") String name,@PathVariable("Sheng") String sheng,@PathVariable("Score") Float score){
        Uni uni=new Uni();
        uni.setId(id);
        //id 必须 加上 否则无法修改!!!!
//        uni.setName(name);
        uni.setScore(score);
        uni.setSheng(sheng);
        return uniMapper.updateByPrimaryKeySelective(uni);
        // uni  中的参数有值时才修改  没有值则 不修改
    }

    //修改数据2
    @RequestMapping("/update2/{id}/{Sheng}/{Score}")
    public Uni update2(@PathVariable("id") Integer id,@PathVariable("Sheng") String sheng,@PathVariable("Score") Float score){
        Uni ut=uniMapper.selectByPrimaryKey(id);
        if(ut!=null){
            //数据存在
            Uni uni=new Uni();
            uni.setId(id);
            uni.setScore(score);
            uni.setSheng(sheng);
            int nval=uniMapper.updateByPrimaryKeySelective(uni);
            if(nval==1){
                //数据修改成功
                Uni uts=uniMapper.selectByPrimaryKey(id);
                return uts;
            }else {
                return null;
            }
        }else {
            return null;
        }
    }

    //取出所有数据
    @RequestMapping("/queryall")
    public List<Uni> qall(){
        List<Uni> list;
        list=uniMapper.selectAll();
        return list;
    }
}
