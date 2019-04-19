
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, BelongsToMany } from 'sequelize-typescript';
import WxUser from './WxUser';
import UserAndWx from './UserAndWx';

/**
 * 统计
 */
@Table({
    charset: 'utf8mb4',
    tableName:'user',
    timestamps: true
})
export default class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: '用户名', field: 'user_name'})
    userName: string;
    @Column({comment: '密码', field: 'pwd'})
    pwd: string;
    @Column({comment: '手机', field: 'phone', type: DataType.INTEGER})
    phone: string;
    @Column({comment: '昵称', field: 'nick_name'})
    nickName: string;
    @Column({comment: '性别', field: 'sex'})
    sex: string;
    @Column({comment: '生日', field: 'birth_date', type: DataType.DATE})
    birthDate: string;

    @BelongsToMany(() => WxUser, () => UserAndWx)
    wxUsers: WxUser[];
}

