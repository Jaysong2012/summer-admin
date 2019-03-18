<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker
                    v-model="listQuery.datetimepick"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
        </div>

        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;">
            <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('system.history.user')" min-width="80px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.sysuserId }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('system.history.url')" min-width="80px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.url }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('system.history.params')" min-width="80px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.params }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('system.history.rsp')" min-width="120px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.rsp }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('system.history.time')" min-width="120px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>
</template>

<script>
    import { fetchHistoryList } from '../../../api/system'
    import waves from '../../../directive/waves' // Waves directive
    import { parseTime } from '../../../utils'
    import Pagination from '../../../components/Pagination' // Secondary package based on el-pagination

    export default {
        name: "history.List",
        components: { Pagination  },
        directives: { waves },
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    currentPage: 1,
                    pageSize: 20,
                    status: 1,
                    datetimepick:[new Date().format("yyyy-MM-dd 00:00:00"),new Date().format("yyyy-MM-dd 23:59:59")],
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                console.log(this.listQuery);
                fetchHistoryList(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.total = response.data.total;

                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listQuery.currentPage = 1;
                this.getList()
            }
        }
    }
</script>

<style scoped>

</style>
