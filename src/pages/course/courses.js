import React from "react";
import {Toast} from 'antd-mobile';
import {} from "react-router-dom"
import {Menu, ActivityIndicator, NavBar, Icon} from 'antd-mobile';
import {TabBar} from 'antd-mobile';
import {getCategoryWithParentID, getAllCategory} from "../../controller/categoryContriller"
import "./course_pane.less"
import "./course_content.less"
import "./tabBar.less"
import "./course.less"
import Course from "./course"
import {getAllCourseList} from "../../controller/courseApi";
import {BASE_URL} from "../../config/const_config";


const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];


const data1 = [

    {
        "value": 1,
        "label": "党建",
        "children": [
            {
                "value": 2,
                "label": "党建1"
            },
            {
                "value": 3,
                "label": "党建2"
            },
            {
                "value": 4,
                "label": "党建3"
            },
            {
                "value": 5,
                "label": "党建4"
            },
            {
                "value": 6,
                "label": "党建5"
            }
        ]
    },
    {
        "value": 7,
        "label": "技术",
        "children": [
            {
                "value": 8,
                "label": "技术1"
            },
            {
                "value": 9,
                "label": "技术2"
            },
            {
                "value": 10,
                "label": "技术3"
            },
            {
                "value": 11,
                "label": "技术4"
            },
            {
                "value": 12,
                "label": "技术5"
            }
        ]
    },
    {
        "value": 13,
        "label": "支撑",
        "children": [
            {
                "value": 14,
                "label": "支撑1"
            },
            {
                "value": 15,
                "label": "支撑2"
            },
            {
                "value": 16,
                "label": "支撑3"
            },
            {
                "value": 17,
                "label": "支撑4"
            },
            {
                "value": 18,
                "label": "支撑5"
            }
        ]
    },
    {
        "value": 19,
        "label": "财务",
        "children": [
            {
                "value": 20,
                "label": "财务1"
            },
            {
                "value": 21,
                "label": "财务2"
            },
            {
                "value": 22,
                "label": "财务3"
            },
            {
                "value": 23,
                "label": "财务4"
            },
            {
                "value": 24,
                "label": "财务5"
            }
        ]
    }
]


export default class Courses extends React.Component {


    state = {

        currentParentCategory: {}, // 记录当前的父菜单
        currentCategoryName: "",//记录当前的分类名称
        coursesList: [],
        categoryAll: [],//所有分类数据
        label: [-1,-1],//当前分类id
        selectedTab: 'redTab',
        hidden: false,
        fullScreen: false,
        initData: '',
        show: false,
    };


    _showSubCategory = (parentCategory) => {
        this.setState({
            currentParentCategory: parentCategory
        })
        this._showCategoryById(parentCategory.id);
    }


    _showCategoryById = (parentID = 0) => {


        if (parentID === 0) {
            this.setState({
                currentParentCategory: {}
            });
        }


        getCategoryWithParentID(parentID).then(result => {
            if (result.status === 0) {
                Toast.success("查询成功", 2);
                // console.log("查询数据结果",result.data);
                this.setState({
                    category1: result.data,
                    categoryAll: data1
                })

            } else {
                Toast.fail("查询失败", 2);
            }
        })
    };

    _showAllCourse = () => {
        getAllCourseList().then(result => {
            // console.log(result.data);
            if (result.status === 0) {
                Toast.success("查询课程成功", 2);
                this.setState({
                    coursesList: result.data
                })
            } else {
                Toast.fail("查询课程失败")
            }

        })
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }


    componentDidMount() {
        this._showCategoryById();
        // console.log(result.data);
        this._showAllCourse();

    }

    onChange = (value) => {
        // console.log("value",value);
        let label = [];
        let currentCategoryName = "";
        this.state.categoryAll.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label.push(dataItem.value);
                currentCategoryName += dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label.push(cItem.value);
                            currentCategoryName += '/' + cItem.label;
                        }
                    });
                }
            }
        });
        // console.log(label);
        this.setState({
            label: label,
            currentCategoryName: currentCategoryName,
            show: !this.state.show,
        })
    };

    handleClick = (e) => {
        console.log(e);
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.categoryAll) {
            setTimeout(() => {
                this.setState({
                    initData: this.state.categoryAll,
                });
            }, 500);
        }
    }


    render() {


        const {show, categoryAll, label, coursesList} = this.state;
        console.log(label.length,label);
        console.log(coursesList);
        // console.log(categoryAll);

        const menuEl = (
            <Menu
                className="foo-menu"
                data={categoryAll}
                // value={label}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.3}
            />
        );
        const loadingEl = (
            <div style={{
                width: '100%',
                height: document.documentElement.clientHeight * 0.3,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large"/>
            </div>
        );

        return <div className={"course_pane"}>

            {/*导航栏*/}
            <NavBar
                className={"navbar"}
                mode="light"
                icon={<Icon type="left"/>}
                onLeftClick={this.handleClick}
                value ={[1,2]}
                rightContent={[
                    <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                    <Icon key="1" type="ellipsis"/>,
                ]}
            >课程列表</NavBar>

            {/*课程内容*/}
            <div className={"course_content"}>

                <div className={"menu"}>
                    <div className={show ? 'menu-active' : ''}>
                        <div>
                            <NavBar
                                leftContent="分类"
                                mode="dark"
                                icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg"
                                           className="am-icon am-icon-md" alt=""/>}
                                onLeftClick={this.handleClick}
                                className="top-nav-bar"
                            >
                                {this.state.currentCategoryName}
                            </NavBar>
                        </div>
                        {show ? categoryAll ? menuEl : loadingEl : null}
                        {show ? <div className="menu-mask" onClick={this.onMaskClick}/> : null}
                    </div>

                    <div>
                        <div className={"course"}>
                            <ul>
                                {coursesList.map(course => {

                                    if (label[0] !== -1 && label[1] === -1 && course.category_id === label[0]) {
                                        return <Course src={BASE_URL + course.course_img} title={course.course_title}
                                                       intro={course.course_intro}/>

                                    } else if (label[0] !== -1 && label[1] !== -1 && course.category_id === label[1]) {
                                        return <Course src={BASE_URL + course.course_img} title={course.course_title}
                                                       intro={course.course_intro}/>

                                    } else if (label[0] ===-1 && label[1] ===-1) {
                                        return <Course src={BASE_URL + course.course_img} title={course.course_title}
                                                           intro={course.course_intro}/>
                                    }

                                })}

                            </ul>
                        </div>

                    </div>


                </div>


            </div>
            {/*底部栏*/}
            <div className={"tabBar"}>
                <TabBar>
                    <TabBar.Item
                        title="Life"
                        key="Life"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Koubei"
                        key="Koubei"
                        badge={'new'}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="Friend"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                        selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>


        </div>
    }
}