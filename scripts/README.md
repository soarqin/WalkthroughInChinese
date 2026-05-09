# scripts

本目录放置翻译攻略维护脚本。当前工作流用于处理未确定中文译名。

## 占位格式

未定译名统一写成：

~~~text
[[待定译名:English Source|暂译中文]]
~~~

- `English Source`：英文原词或英文短语。
- `暂译中文`：当前正文中暂时采用的中文表达。

## 扫描未定译名

~~~bash
node scripts/scan-unconfirmed-terms.mjs
node scripts/scan-unconfirmed-terms.mjs games/tales-of-symphonia
~~~

脚本会输出文件、行号、英文原文和暂译中文。若没有未定译名，退出码为 `0`。

## 批量替换已确认译名

~~~bash
node scripts/replace-unconfirmed-term.mjs "Grade Shop" "Grade 商店"
node scripts/replace-unconfirmed-term.mjs "Over Limit" "极限状态" games/tales-of-symphonia
~~~

脚本只替换完全匹配 `English Source` 的占位符，并保留其他正文不变。替换后建议再次运行扫描脚本确认剩余占位。

