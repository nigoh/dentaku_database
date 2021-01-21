-- Project Name : 四則演算
-- Date/Time    : 2021/01/21 20:44:25
-- Author       : souta
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
*/

-- Cal_TABLE
--* RestoreFromTempTable
create table Cal_TABLE (
  id char not null
  , formura text
  , constraint Cal_TABLE_PKC primary key (id)
) ;

comment on table Cal_TABLE is 'Cal_TABLE';
comment on column Cal_TABLE.id is 'id';
comment on column Cal_TABLE.formura is 'formula';

