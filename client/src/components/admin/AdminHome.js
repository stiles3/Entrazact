import React, { Component } from 'react'
import { Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words'
import axios from 'axios'

export class UsersList extends Component {
     state = {
      searchText: '',
      pagination: {},
      loading: false,
      data:null,
      visible: false,
    }

     componentDidMount() {
        this.fetch();
      }

     handleTableChange = (pagination, filters, sorter) => {
         const pager = {...this.state.pagination}
         pager.current = pagination.current
         this.setState({
             pagination: pager,
         })

         this.fetch({
             results: pagination.pageSize,
             page:pagination.current,
             sortField: sorter.field,
             sortOrder: sorter.order,
             ...filters
         })
     }

     fetch = (params = {}) => {
         console.log('params:', params)
         this.setState({loading:true})
         var headers = {
            'Content-Type': 'application/json'
          }
        
          var data = {
           results: 10,
           ...params
        }
         axios.get('api/users/getall', data, headers)
         .then(res => {
             this.setState({data: res.data})
             console.log(this.state.data)
              const pagination = {...this.state.pagination}
             pagination.total = 200
             this.setState({
                 loading: false,
               //  data:  res.data,
                          pagination
             }) 
         })
     }
       
   
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm,  clearFilters}) => (
            <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>  
        ),

        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
          ),

          onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
       
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => this.searchInput.select());
                }
              },
              render: text => (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[this.state.searchText]}
                  autoEscape
                 // textToHighlight={text.toString()}
                />
              ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

    render() {
     
        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                //...this.getColumnSearchProps('username'),
                //fixed: 'left',
                width:'10%'
            },
            {
                title: 'First Name',
                dataIndex: 'firstname',
                key: 'firstName',
               // ...this.getColumnSearchProps('firstName'),
                width:'10%'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                key: 'lastName',
               // ...this.getColumnSearchProps('lastName'),
               width:'10%'
            },
            {
                title: 'Phone Number',
                dataIndex: 'phone',
                 key: 'phone',
                width:'10%',
               //...this.getColumnSearchProps('phone')
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            //    width:'10%',
               // ...this.getColumnSearchProps('email')
            },
        ]
        return (
          <div>
    <br/>
    <br/>
    <br/>
    <br/>
             <Table 
              columns={columns}
              //rowKey={ this.state.data.toString()}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange}
              scroll={{ x: 1500, y: 300 }}
              />
          </div>
          
        )
    }
}

export default UsersList