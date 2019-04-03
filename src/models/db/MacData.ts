
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

/**
 * 统计
 */
@Table({
    charset: 'utf8',
    tableName:'mac_data'
})
export default class MacData extends Model<MacData> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column
    state: number;
    @Column({comment: '访问时间', field: 'create_time', type: DataType.DATE})
    createTime: number;
    @Column({comment: '访问设备信息', field: 'device_id'})
    deviceID: string;
    @Column({comment: 'mac地址', field: 'mac'})
    mac: string;
    @Column({comment: '捕获时间', field: 'capture_time'})
    captureTime: string;
    @Column({comment: '省'})
    province: string;
    @Column({comment: '原始数据', field: 'original_data'})
    originalData: string;
    @Column({comment: '门店ID', field: 'shop_id'})
    shopId: string;
}



