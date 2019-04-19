import { Table, Column, Model, ForeignKey, PrimaryKey } from 'sequelize-typescript'
import User from './User';
import WxUser from './WxUser';

@Table({ freezeTableName: true, timestamps: false, tableName: 'user_and_wx' })
export default class UserAndWx extends Model<UserAndWx> {
    @ForeignKey(() => WxUser)
    @PrimaryKey
    @Column({comment: '', field: 'wx_user_id'})
    wxId: number
   
    @ForeignKey(() => User)
    @PrimaryKey
    @Column({comment: '', field: 'user_id'})
    userId: number;
}