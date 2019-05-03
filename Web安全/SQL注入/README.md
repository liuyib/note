# SQL 注入

示例1：

``` sql
# SQL 指令：
select * from table where id=${id};

# 如果接收到的 id 为 1 or 1=1 那么就会产生 SQL 注入：
select * from table where id=1 or 1=1;
# 这里 or 后面 1=1 是恒等的，所以这条指令会查询出 table 中的所有数据
```

示例2：

``` sql
# SQL 指令：
select * from user where username = '${data.username}' and password = '${data.password}';

# 如果 data.password 为 1' or '1'='1
select * from user where username = 'xxx' and password = '1' or '1'='1';
# 同理，这里 '1'='1' 是恒等的，所以会查询出 user 表的所有数据
```

## 一些神奇的 SQL 语法

``` sql
# 由于 1=0 恒不等，所以这条语句会输出数据库找不到数据时的错误信息
select * from table where id="10" and 1=0

# 由于 1=1 恒等，所以这条语句会输出 table 表中的所有数据
select * from table where id="10" or 1=1

# 通过不断改变后面的数字 5 为其他的值，来获取字符串（这里是 mysql 的版本号）的值
select * from table where id="10" and mid(version(),1,1)=5

# 同上，通过不断改变后面 x 的值，来尝试出用户名的具体值
select * from table where mid(username,1,1)="x"

# 查询到的数据始终是 1 2 3
select 1,2,3 from table

# 查询到的数据始终是 id 1 2 3
select id,1,2,3 from table

# 从 table2 中查询到数据后，再联合查询 table 中的数据
# 如果这两个查询结果的列数不一致，就会报错
# 这样通过改变查询 table2 的列数，就能够尝试出 table 的列数
select * from table union select 1,2,3 from table2
```

## SQL 注入防御

- 关闭错误信息

> 程序出错时，不要把错误信息返回给前端。只让前端知道出错了即可。

- 检查数据类型（前后端都要检查输入的数据的合法性）
- 对数据进行转义（类似防御 XSS 时的转义）
- 使用参数化查询（参数化查询使得变量的值不会改变 SQL 语句的结构）
- 使用 ORM（对象关系映射。就是把数据库中的数据映射到代码中的对象）
