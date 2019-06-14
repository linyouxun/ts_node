import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ConfigHtml from './ConfigHtml';

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
    @ForeignKey(() => ConfigHtml)
    @Column({comment: '配置ID', field: 'config_id'})
    configId: number;
    @BelongsTo(() => ConfigHtml)
    config: ConfigHtml;
    /**
     * 页面信息
     */
    @Column({comment: '页面路径', field: 'view_url', type: DataType.STRING(2000)})
    viewUrl: string;
    @Column({comment: '上一页面访问路径', field: 'pre_view_url', type: DataType.STRING(2000)})
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
    @Column({comment: '访问者', field: 'visitor', type: DataType.STRING(2000)})
    visitor: string;
    /**
     * 设备信息
     */
    @Column({comment: '访问设备信息', field: 'device_info'})
    deviceInfo: string;
    @Column({comment: '屏幕', field: 'screen'})
    screen: string;
    @Column({comment: '设备额外信息', field: 'referrer', type: DataType.STRING(2000)})
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
    @Column({comment: '区'})
    county: string;
    @Column({comment: '省编码'})
    provinceCode: string;
    @Column({comment: '市编码'})
    cityCode: string;
    @Column({comment: '区编码'})
    adcode: string;
}



