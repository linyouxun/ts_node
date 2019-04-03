
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import UpdateLabel from './UpdateLabel';
import UpdateLogAndLabel from './UpdateLogAndLabel';

/**
 * 统计
 */
@Table({
    charset: 'utf8',
    tableName:'update_log'
})
export default class UpdateLog extends Model<UpdateLog> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column
    state: number;
    @Column({comment: '创建时间', field: 'create_time', type: DataType.BIGINT})
    createTime: number;
    @Column({comment: '更新时间', field: 'update_time', type: DataType.BIGINT})
    updateTime: number;
    // @Column({comment: '标签', field: 'labels'})
    // labels: string;
    @Column({comment: '更新内容', field: 'html', type: DataType.TEXT})
    html: string;
    @Column({comment: '创建者', field: 'user_name'})
    userName: string;
    @Column({comment: '创建ID', field: 'user_id'})
    userId: string;
    @Column({comment: '附件', field: 'accessory'})
    accessory: string;
    @Column({comment: '查看次数', field: 'count'})
    count: number;
    @Column({comment: '查看基数', field: 'count_base'})
    countBase: number;
    
    /**
     * 关联很蛋疼
     */
    @BelongsToMany(() => UpdateLabel, () => UpdateLogAndLabel)
    labels: UpdateLabel[];
}



