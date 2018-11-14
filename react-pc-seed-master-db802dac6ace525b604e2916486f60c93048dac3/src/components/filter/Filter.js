/**
 * Created by linkage on 2017/4/5.
 */
import React, { PropTypes, PureComponent } from 'react';
import { autobind } from 'core-decorators';


import './filter.less';


export default class Filter extends PureComponent {

    @autobind
    searchList(e){
        const { replace, location: { query } } = this.props;
            replace({
                pathname: '/test',
                query: {
                    ...query,
                    eventName:'ddd'
                },
            });

        // this.props.onOpenChange();
    }



    render() {
       return(
           <div className="filter-box">
               <label>检索条件：</label>
               <span className="filter-search"  onClick={this.searchList}></span>
               <input type="text" className="filter-input"   ref="myInput" />
           </div>
       );
    }
}


