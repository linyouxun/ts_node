
import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, BelongsToMany } from 'sequelize-typescript';
import User from './User';
import UserAndWx from './UserAndWx';

/**
 * 统计
 */
@Table({
    charset: 'utf8mb4',
    tableName:'wx_user',
    timestamps: true
})
export default class WxUser extends Model<WxUser> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    @Column({comment: '市', field: 'city'})
    city: string;
    @Column({comment: '省', field: 'province'})
    province: string;
    @Column({comment: '国家', field: 'country'})
    country: string;
    @Column({comment: '头像', field: 'headimg_url'})
    headimgurl: string;
    @Column({comment: '语言', field: 'language'})
    language: string;
    @Column({comment: '性别', field: 'sex', type: DataType.INTEGER})
    sex: string;
    @Column({comment: '微信公众号标识', field: 'open_id'})
    openid: string;
    @Column({comment: '是否关注', field: 'attention', type: DataType.INTEGER})
    attention: string;

    @BelongsToMany(() => User, () => UserAndWx, 'wxId')
    users: User[];
}