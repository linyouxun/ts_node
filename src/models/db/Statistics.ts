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
    /**
     * 配置信息
     */
    @Column({comment: '配置ID', field: 'config_id'})
    configId: number;
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
    @Column({comment: '访问次数（浏览器关闭结束）', field: 'visit_html_count'})
    visitHtmlCount: number;
    @Column({comment: '访问次数（单天浏览器）', field: 'visit_count'})
    visitCount: number;
    @Column({comment: '访问次数（浏览器）', field: 'visit_count_total'})
    visitCountTotal: number;
    @Column({comment: '访问者', field: 'visitor'})
    visitor: string;
    /**
     * 设备信息
     */
    @Column({comment: '访问设备信息', field: 'device_info'})
    deviceInfo: string;
    @Column({comment: '屏幕', field: 'screen'})
    screen: string;
    @Column({comment: '设备额外信息', field: 'referrer'})
    referrer: string;
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



