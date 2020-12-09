# 字体裁剪工具（cutfont）

压缩您的字体包，字体包只保留你想要的文字！

[GitHub](https://github.com/Leslie-Chuan/cutfont.git)

## 背景

为了特定的显示效果，往往需要使用特定的字体包。但是中文字体包往往体积很大，可到 30m。那我们把它裁剪压缩，体积变小，就能满足需求。

## 使用

### 安装

```shell
npm install cutfont -g
```

### 使用方式
**默认使用方式（字体包目录下执行命令）**
```shell
cutfont d
```

**自定义压使用方式**

1. 把您想要的字体写入.txt 文件中
2. .txt 文件与您的字体包命名一致
   <img alt="字体裁剪工具使用界面" width="400" src="https://raw.githubusercontent.com/Leslie-Chuan/cutfont/main/example/step1.jpg">

3. 执行命令：

```shell
cutfont c
```

## 命令说明

**生成默认的 3500 个常用汉字和半角 、全角特殊字符和英文还有数字的字体包。**

```shell
cutfont d
```

**根据您的.txt 文件裁剪.ttf 字体包。**

```shell
cutfont c
```

## 使用示例

<img alt="字体裁剪工具使用界面" width="700" src="https://raw.githubusercontent.com/Leslie-Chuan/cutfont/main/example/use.gif">

## 鸣谢

[字蛛](https://github.com/aui/font-spider)

## 注意：

- 目前只支持.ttf 文件裁剪，想要更多 issues 留言！
