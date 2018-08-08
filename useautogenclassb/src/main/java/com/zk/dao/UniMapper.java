package com.zk.dao;

import com.zk.entity.Uni;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UniMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Uni record);

    int insertSelective(Uni record);

    Uni selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Uni record);

    int updateByPrimaryKey(Uni record);

    List<Uni> selectAll();
}