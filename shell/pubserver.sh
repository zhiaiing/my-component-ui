rm -rf dist
mkdir dist


tar -czf dist/storybook-dist.tar.gz storybook-static/*


scp -rC dist/storybook-dist.tar.gz root@101.34.170.165:/usr/tmp/storybook-dist.tar.gz

ssh root@101.34.170.165 << eeooff
rm -rf /usr/storybook/*
cd /usr/storybook/
echo "正在清理以前的文件..."
echo "解压文件中..."
cp -r -f /usr/tmp/storybook-dist.tar.gz /usr/storybook/
tar -xzf storybook-dist.tar.gz
cp -r -f storybook-static/* /usr/storybook/
echo "安装依赖"
cnpm i
echo "重启服务"
echo "清理文件中..."
rm -rf /usr/storybook/storybook-dist.tar.gz
rm -rf /usr/tmp/storybook-dist.tar.gz
echo "上传成功"
exit
eeooff



# rm -rf dist