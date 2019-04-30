import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import Statistics from './Statistics';

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
    @HasMany(() => Statistics)
    statistics: Statistics[];
}
