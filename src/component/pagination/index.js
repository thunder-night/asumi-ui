/**
 * Created by elly on 2017/4/28.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import PageButton         from './pageButton';
import {noop}             from "../util";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.startPage = 1;
        this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
        this.lastPage = props.paginationSize;
        this.center = Math.floor(props.paginationSize / 2);
    }

    componentWillReceiveProps(props) {
        this.finalStartPage = Math.ceil(props.dataSize / props.sizePerPage) - props.paginationSize + 1;
        this.lastPage = props.paginationSize;
        this.center = Math.floor(props.paginationSize / 2);
    }

    render() {
        const {
            current,
            dataSize,
            endLabel,
            nextLabel,
            prevLabel,
            startLabel,
            sizePerPage,
            onPageChange,
            hideEndLabel,
            hideStartLabel,
            paginationSize,
            showTotalPages
        } = this.props;
        const totalPages = Math.ceil(dataSize / sizePerPage);
        if (current > paginationSize - 1 && current <= totalPages) {
            this.lastPage = Math.min(totalPages, current + paginationSize - this.center - 1);
            if (current > this.finalStartPage) {
                this.startPage = this.finalStartPage;
            }
            if (this.lastPage - this.startPage !== paginationSize - 1) {
                this.startPage = current - this.center;
            }
        } else {
            this.startPage = 1;
            this.lastPage = Math.min(totalPages, paginationSize);
        }
        //逻辑修改为只要当前页不是首页，则可点击(原逻辑：看不见首页才能点击首页)
        let PageButtons = [
            <PageButton
                disabled={current === 1 || totalPages < 1}
                label={startLabel} hidden={hideStartLabel} pgBtn={true}
                key='start' onClick={() => onPageChange(1, sizePerPage)}/>,
            <PageButton
                label={prevLabel} disabled={current <= 1 || !dataSize} pgBtn={true}
                key='prev' onClick={() => onPageChange(current - 1, sizePerPage)}/>
        ];
        for (let i = this.startPage; i < this.lastPage + 1; i++) {
            PageButtons.push(<PageButton label={i} active={current === i} key={i}
                                         onClick={() => onPageChange(i, sizePerPage)}/>);
        }
        PageButtons.push(
            <PageButton
                label={nextLabel} disabled={current === totalPages || totalPages < 1} pgBtn={true}
                key='next' onClick={() => onPageChange(current + 1, sizePerPage)}/>
        );
        //逻辑修改为只要当前页不是尾页，则可点击(原逻辑：看不见首页才能点击尾页)
        PageButtons.push(
            <PageButton
                label={endLabel} hidden={hideEndLabel}
                disabled={this.lastPage === current || totalPages < 1} pgBtn={true}
                key='end' onClick={() => onPageChange(totalPages, sizePerPage)}/>
        );

        return (
            <div>
                <ul className="el-pagination">
                    {PageButtons}
                </ul>
                {showTotalPages &&
                <span className="el-totalPages">共 {totalPages} 页</span>}
            </div>
        );
    }
}

Pagination.propTypes = {
    endLabel: PropTypes.any,
    nextLabel: PropTypes.any,
    prevLabel: PropTypes.any,
    startLabel: PropTypes.any,
    current: PropTypes.number,
    dataSize: PropTypes.number,
    onPageChange: PropTypes.func,
    hideEndLabel: PropTypes.bool,
    sizePerPage: PropTypes.number,
    hideStartLabel: PropTypes.bool,
    showTotalPages: PropTypes.bool,
    paginationSize: PropTypes.number,
};

Pagination.defaultProps = {
    current: 1,
    dataSize: 0,
    sizePerPage: 10,
    paginationSize: 6,
    hideEndLabel: false,
    hideStartLabel: false,
    showTotalPages: true,
    prevLabel: <span><span className="el-caret el-left"/>上一页</span>,
    nextLabel: <span>下一页<span className="el-caret el-right"/></span>,
    startLabel: '首页',
    endLabel: '尾页',
    onPageChange: noop
};