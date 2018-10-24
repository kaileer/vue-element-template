
<template>
  <div>
    <!-- <Card title="导入EXCEL">
      <Row>
        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传文件</Button>
        </Upload>
      </Row>
    </Card> -->
    <el-upload
      class="upload-demo"
      action=""
      :before-upload="handleBeforeUpload"
      accept=".xls, .xlsx"
      :file-list="fileList">
      <el-button size="small" type="primary" @click="handleUploadFile">点击上传</el-button>
    </el-upload>
    <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="日期" :label="ttt" width="180">
          </el-table-column>
          <el-table-column prop="姓名" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="地址" label="地址">
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import excel from '@/assets/utils/excel'
export default {
  name: 'upload-excel',
  data () {
    return {
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      fileList:[],
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false,
      ttt: 'asd'
    }
  },
  methods: {
    initUpload () {
      this.file = null
      this.showProgress = false
      this.loadingProgress = 0
      this.tableData = []
      this.tableTitle = []
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$notify.warning({
          title: '文件类型错误',
          message: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.tableLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round(e.loaded / e.total * 100)
      }
      reader.onerror = e => {
        this.$message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$message.info('文件读取成功')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => { return { title: item, key: item } })
        console.log(tableTitle)
        this.tableData = results
        this.tableTitle = tableTitle
        this.uploadLoading = false
        this.tableLoading = false
        this.showRemoveFile = true
      }
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
