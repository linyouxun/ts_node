import { Table, Column, Model, ForeignKey, PrimaryKey, BelongsTo, BelongsToMany,  } from 'sequelize-typescript'
import UpdateLabel from './UpdateLabel';
import UpdateLog from './UpdateLog';

@Table({ freezeTableName: true, timestamps: false, tableName: 'update_log_labels' })
export default class UpdateLogAndLabel extends Model<UpdateLogAndLabel> {
    @ForeignKey(() => UpdateLog)
    @PrimaryKey
    @Column({comment: '', field: 'log_id'})
    logId: number
   
    @ForeignKey(() => UpdateLabel, )
    @PrimaryKey
    @Column({comment: '', field: 'label_id'})
    labelId: number;
}