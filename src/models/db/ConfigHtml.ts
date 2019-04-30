import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, DataType } from 'sequelize-typescript';
import Statistics from './Statistics';

enum types {
    miniapp = '小程序', wx = '公众号', web = 'web',
    other = '其他', app = 'app', sort = '桌面软件'
}
/**
 * 统计
 */
@Table({
    // charset: 'utf8',
    tableName:'config_html',
    timestamps: true
})
export default class ConfigHtml extends Model<ConfigHtml> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: '名字', field: 'title'})
    title: string;
    @Column({
        comment: '类型', 
        field: 'type',
        type: DataType.ENUM(types.miniapp, types.wx, types.web, types.other, types.app, types.sort),
    })
    type: string;

    @HasMany(() => Statistics)
    statistics: Statistics[];
}
