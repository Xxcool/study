<template>
  <div class="container">
    <input
      type="file"
      ref="upload"
      accept=".xls,.xlsx"
      class="outputlist_upload"
    />
    <div id="result" name="result"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {}
  },
  mounted () {
    this.$refs.upload.addEventListener('change', (e) => {
      // 绑定监听表格导入事件
      this.readExcel(e)
    })
  },
  methods: {
    readExcel (e) {
      // 表格导入
      const files = e.target.files[0]
      console.log(files)
      this.readWorkbookFromLocalFile(files, (workbook) => {
        // this.readWorkbook(workbook)
        this.to_html(workbook)
      })
    },
    readWorkbookFromLocalFile (file, callback) {
      var reader = new FileReader()
      reader.onload = function (e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'binary' })
        if (callback) callback(workbook)
      }
      reader.readAsBinaryString(file)
    },

    to_html (workbook) {
      document.getElementById('result').innerHTML = ''
      workbook.SheetNames.forEach(function (sheetName) {
        var htmlstr = XLSX.write(workbook, {
          sheet: sheetName,
          type: 'string',
          bookType: 'html'
        })
        document.getElementById('result').innerHTML += htmlstr
      })
      return ''
    },

    readWorkbook (workbook) {
      console.log(workbook)
      var sheetNames = workbook.SheetNames // 工作表名称集合
      var worksheet = workbook.Sheets[sheetNames[0]] // 这里我们只读取第一张sheet
      var csv = XLSX.utils.sheet_to_csv(worksheet)
      document.getElementById('result').innerHTML = this.csv2table(csv)
    },
    csv2table (csv) {
      var html = '<table>'
      var rows = csv.split('\n')
      rows.pop() // 最后一行没用的
      rows.forEach(function (row, idx) {
        var columns = row.split(',')
        columns.unshift(idx + 1) // 添加行索引
        if (idx === 0) {
          // 添加列索引
          html += '<tr>'
          for (var i = 0; i < columns.length; i++) {
            html +=
              '<th>' +
              (i === 0 ? '' : String.fromCharCode(65 + i - 1)) +
              '</th>'
          }
          html += '</tr>'
        }
        html += '<tr>'
        columns.forEach(function (column) {
          html += '<td>' + column + '</td>'
        })
        html += '</tr>'
      })
      html += '</table>'
      return html
    }
  }
}
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  min-height: 100vh;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: solid 1px #6d6d6d;
  padding: 5px 10px;
}
.mt-sm {
  margin-top: 8px;
}
</style>
