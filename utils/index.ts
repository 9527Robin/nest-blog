export async function getContent(url: string) {
  if (!url) return
  // const res = await fetch('https://www.langrenxiaoshuo.com/html/fengyanyilu/787342.html')
  // console.log(url, 'url')
  const res = await fetch(url)
  const iconv = require('iconv-lite')

  const buffer = await res.arrayBuffer()
  const result = iconv.decode(Buffer.from(buffer), 'gbk') // 假设是 GBK 编码
  // console.log(result)
  return {
    props: { result }, // will be passed to the page component as props
  }
}
