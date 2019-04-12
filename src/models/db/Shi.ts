
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

/**
 * 统计
 */
@Table({
    charset: 'utf8',
    tableName:'shi_data'
})
export default class Shi extends Model<Shi> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: '作者', field: 'author_name'})
    authorName: string;
    @Column({comment: '标题', field: 'title'})
    title: string;
    @Column({comment: '年代', field: 'dynasty'})
    dynasty: string;
    @Column({comment: '类型', field: 'kind_cn'})
    kindCN: string;
    @Column({comment: '内容', type: DataType.TEXT})
    content: string;
}
