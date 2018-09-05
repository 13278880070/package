package com.zk.service.impl;

import com.zk.dao.UniMapper;
import com.zk.entity.Uni;
import com.zk.service.UniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by MACHENIKE on 2018/8/8 0008.
 */

@Service(value = "UniService")
//表明这个类 是为 UniService 接口来服务的
public class UniServiceImpl implements UniService{
    //实现 接口里面声明的所有函数
    @Autowired
    UniMapper uniMapper;
//    @SuppressWarnings("SpringJavaAutoWiringInspection")
    @Override
    public int Delete(Integer id){
        return uniMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int Insert(Uni record, Integer flag){
        if(flag==0){
            return uniMapper.insert(record);
        }else {
            return uniMapper.insertSelective(record);
        }
    }

    @Override
    public Uni Select(Integer id) {
        return uniMapper.selectByPrimaryKey(id);
    }

    @Override
    public int Update(Uni record,Integer flag){
        if(flag==0){
            return uniMapper.updateByPrimaryKey(record);
        }else {
            return uniMapper.updateByPrimaryKeySelective(record);
        }
    }
    @Override
    public List<Uni> SelectA(){
        return uniMapper.selectAll();
    }
}
