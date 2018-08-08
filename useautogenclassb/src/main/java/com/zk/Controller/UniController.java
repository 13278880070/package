package com.zk.Controller;

import com.zk.dao.UniMapper;
import com.zk.entity.Uni;
import com.zk.service.UniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by MACHENIKE on 2018/8/8 0008.
 */

@RestController
@RequestMapping("/uni")
public class UniController {
    @Autowired
    UniService uniService;

    //查询语句
    @RequestMapping("/con/{id}")
    public Uni getCon(@PathVariable("id") Integer id){
        return uniService.Select(id);
    }

    //添加数据
    @RequestMapping("/add/{Name}/{Sheng}/{Score}")
    public int addit(@PathVariable("Name")String name,
                     @PathVariable("Sheng")String sheng,@PathVariable("Score")Float score){
        Uni uni=new Uni();
        uni.setName(name);
        uni.setSheng(sheng);
        uni.setScore(score);
        return uniService.Insert(uni,1);
        //  0   1  对应UniServiceImpl中的  flag 选择项
    }

    //删除数据
    @RequestMapping("/remove/{id}")
    public int move(@PathVariable("id")Integer id){
        return uniService.Delete(id);
    }

    //修改数据
    @RequestMapping("/update/{id}/{Sheng}/{Score}")
    public Uni upda(@PathVariable("id")Integer id,@PathVariable("Sheng")String sheng,@PathVariable("Score")Float score){
        Uni uni=uniService.Select(id);
        if(uni!=null){
            Uni ut=new Uni();
            ut.setId(id);
            ut.setSheng(sheng);
            ut.setScore(score);
            int nval=uniService.Update(ut,1);
            if(nval==1){
                Uni u=uniService.Select(id);
                return u;
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
        return uniService.SelectA();
    }
}
