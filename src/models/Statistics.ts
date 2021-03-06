import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

/**
 * 统计
 */
@Table({
    charset: 'utf8',
    tableName:'view_log'
})
export default class Statistics extends Model<Statistics> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: 'code标识码', type: DataType.STRING})
    code: number;

    /**
     * 用户信息
     */
    @Column({comment: '用户ID', field: "user_id"})
    userId: number;
    @Column({comment: '用户名称', field: 'user_name'})
    userName: string;
    /**
     * 页面信息
     */
    @Column({comment: '页面路径', field: 'view_url'})
    viewUrl: string;
    @Column({comment: '上一页面访问路径', field: 'pre_view_url'})
    preViewUrl: string;
    @Column({comment: '停留时间', field: 'last_time'})
    lastTime: number;
    @Column({comment: '访问时间', field: 'create_time', type: DataType.BIGINT})
    createTime: number;
    /**
     * 设备信息
     */
    @Column({comment: '访问设备信息', field: 'device_info'})
    deviceInfo: string;
    @Column({comment: '屏幕', field: 'screen'})
    screen: string;
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



