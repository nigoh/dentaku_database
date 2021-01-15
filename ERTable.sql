-- Project Name : 四則演算
-- Date/Time    : 2021/01/15 22:53:06
-- Author       : souta
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
*/

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

comment on table "Table‗B" is '履歴用:履歴用テーブル';
comment on column "Table‗B".ID is 'ID';
comment on column "Table‗B".LOG is 'LOG';

comment on table Table_A is '計算用:計算用テーブル';
comment on column Table_A.ID is 'ID';
comment on column Table_A.val1 is 'val1';
comment on column Table_A.val2 is 'val2';

