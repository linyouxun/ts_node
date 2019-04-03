import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import UpdateLog from './UpdateLog';
import UpdateLogAndLabel from './UpdateLogAndLabel';

/**
 * 统计
 */
@Table({
    charset: 'utf8',
    tableName:'update_label'
})
export default class UpdateLabel extends Model<UpdateLabel> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: '标签名字', field: 'label_name'})
    labelName: string;

    @BelongsToMany(() => UpdateLog, () => UpdateLogAndLabel)
    updateLog: UpdateLog[];
}
