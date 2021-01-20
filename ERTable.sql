-- Project Name : 四則演算
-- Date/Time    : 2021/01/21 1:28:13
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
  , left integer
  , right integer
  , caltype char
  , result integer
  , constraint Cal_TABLE_PKC primary key (id)
) ;

-- 履歴用
--* RestoreFromTempTable
create table "Table‗B" (
  ID integer not null
  , LOG char
) ;

-- 計算用
--* RestoreFromTempTable
create table Table_A (
  ID integer not null
  , val1 integer
  , val2 integer
) ;

comment on table Cal_TABLE is 'Cal_TABLE';
comment on column Cal_TABLE.id is 'id';
comment on column Cal_TABLE.left is 'lefr';
comment on column Cal_TABLE.right is 'right';
comment on column Cal_TABLE.caltype is 'caltype';
comment on column Cal_TABLE.result is 'result';

comment on table "Table‗B" is '履歴用:履歴用テーブル';
comment on column "Table‗B".ID is 'ID';
comment on column "Table‗B".LOG is 'LOG';

comment on table Table_A is '計算用:計算用テーブル';
comment on column Table_A.ID is 'ID';
comment on column Table_A.val1 is 'val1';
comment on column Table_A.val2 is 'val2';

