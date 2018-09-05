package com.zk.service;

import com.zk.entity.Uni;

import java.util.List;

/**
 * Created by MACHENIKE on 2018/8/8 0008.
 */
public interface UniService {
    int Delete(Integer id);

    int Insert(Uni record,Integer flag);
    // flag 为 0 执行原 insert语句
    //flag 为 1  执行 原下面insert语句

//    int insertSelective(Uni record);

    Uni Select(Integer id);

//    int updateByPrimaryKeySelective(Uni record);

    int Update(Uni record,Integer flag);
    //flag  作用 与上面相似

    List<Uni> SelectA();
}
