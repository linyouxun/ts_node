import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement } from 'sequelize-typescript';

/**
 * 统计
 */
@Table({
    charset: 'utf8'
})
export default class Statistics extends Model<Statistics> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    /**
     * 用户信息
     */
    @Column({comment: '用户ID'})
    userId: number;
    @Column({comment: '用户名称'})
    userName: string;
    /**
     * 页面信息
     */
    @Column({comment: '页面路径'})
    pageUrl: string;
    @Column({comment: '上一页面访问路径'})
    prePageUrl: string;
    @Column({comment: '停留时间'})
    durationOfTime: number;
    @Column({comment: '访问时间'})
    accessTime: Date;
    @Column({comment: '访问设备信息'})
    deviceInfo: string;
    /**
     * 区域
     */
    @Column({comment: 'IP地址'})
    ip: string;
    @Column({comment: '省'})
    province: string;
    @Column({comment: '城市'})
    city: string;
    @Column({comment: '编码'})
    adcode: string;
}



