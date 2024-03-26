- [注入攻击](#注入攻击)
  - [SQL 注入](#sql-注入)
    - [盲注](#盲注)
    - [Timing Attack](#timing-attack)
    - [用于 SQL 注入的一些语句](#用于-sql-注入的一些语句)
    - [防御 SQL 注入](#防御-sql-注入)
  - [其他的注入攻击](#其他的注入攻击)
    - [XML 注入](#xml-注入)
    - [代码注入](#代码注入)
    - [CRLF](#crlf)
  - [总结](#总结)

# 注入攻击

注入攻击的本质是：**用户输入的数据被当做代码执行**。有两个关键点：

- 用户能够控制输入
- 用户输入的数据被拼接到代码中

从本质出发，防御注入攻击的思想就是**数据与代码分离**

## SQL 注入

示例：

```sql
# 原 SQL 指令
select * from user where username = '${data.username}' and password = '${data.password}';

# 如果 data.password 为 1' or '1'='1
# 同理，这里 '1'='1' 是恒等的，所以会查询出 user 表的所有数据
select * from user where username = 'xxx' and password = '1' or '1'='1';
```

可以看出，由于没有对用户输入的数据进行限制和过滤，数据中的代码被拼接到了 SQL 语句中，改变了原来 SQL 语句的功能，从而可以利用此实现攻击。

### 盲注

盲注的原理是：通过构造永真或永假的 SQL 语句，判断网站是否存在 SQL 注入的漏洞。

比如：假设一个网站页面的 URL 如下：

```http
https://www.example.com/item.php?id=2
```

可以很容易想到，上面代码中 `id=2` 应该是后台查询数据时的一个参数。下面修改这个 URL：

```http
https://www.example.com/item.php?id=2 and 1=1
```

如果此时页面没有变化，并且再次修改 URL：

```http
https://www.example.com/item.php?id=2 and 1=0
```

此时，如果页面无法显示出来，就证明网站存在 SQL 注入的漏洞。

### Timing Attack

有时候虽然网站存在 SQL 注入的漏洞，但是通过 `and 1=0` 这样的盲注技巧无法看出异常。这里可以利用另一个 “盲注” 技巧：`Timing Attack`

在 MySQL 中，有一个 `BENCHMARK` 函数，它用于测试函数性能。它有两个参数：`BENCHMARK(count, expr)` 作用就是将 `expr` 执行 `count` 次。因此，可以利用 `BENCHMARK` 函数让一个函数执行上万次，如果返回结果的时间比平时长，证明注入的语句执行成功。这样就证明了网站存在 SQL 注入漏洞。

> 在不同的数据库中，都有类似于 `BENCHMARK` 这样的函数。

### 用于 SQL 注入的一些语句

```sql
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

### 防御 SQL 注入

- 关闭错误信息

  > 程序出错时，不要把错误信息返回给前端。只让前端知道出错了即可。

- 检查数据类型（前后端都要检查输入的数据的合法性）
- 对数据进行转义（有前辈写好的安全编码函数可以使用）
- 使用参数化查询（参数化查询使得变量的值不会改变 SQL 语句的结构）
- 使用 ORM（对象关系映射。就是把数据库中的数据映射到代码中的对象）

## 其他的注入攻击

### XML 注入

> 注入、防御原理和 HTML 类似。

### 代码注入

代码注入和命令注入一般是因为不安全的函数或方法引起的。

例如 `eval` 函数。严格来说， JSP 和 PHP 中动态 `include` 包含恶意代码的文件也算代码注入。

想要防御代码注入，应该在编写代码时，避免使用不安全的函数，以及避免 JSP 和 PHP 动态 `include` 文件。

### CRLF

`CRLF` 是两个字符：`CR`（**C**arriage **R**eturn），`LF`（**L**ine **F**eed）常被用于不同语义之间的分隔符。因此可以通过注入 `CRLF` 来改变代码原来的语义。

`CRLF` 注入攻击的适用场景：

- 在日志文件中注入 `CRLF`
- 在 HTTP 请求头中注入 `CRLF`
  > 在 HTTP 请求头中，两次 `\r\n` 表示 HTTP 头结束。

`CRLF` 的防御很简单，只要处理好 `\r` `\n` 两个字符即可。

## 总结

对于注入攻击的防御，只要牢记**代码与数据分离**的原则，在数据与代码拼接的地方进行安全检查，就可以避免这个问题。
