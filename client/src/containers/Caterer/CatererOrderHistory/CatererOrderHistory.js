import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import OrderTable from '../../../components/Table/OrderTable/OrderTable';
import Loading from '../../../components/UI/Loading/Loading';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererOrderHistory extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <OrderTable orders={this.props.orders} caterer />;
    if (this.props.loading) {
      orders = <Loading />;
    }
    if (!this.props.loading && this.props.orders.length === 0) {
      orders = <Empty text="Order History" />;
    }
    return (
      <React.Fragment>
        <Header
          bannerText="Your Order History"
          authenticated={this.props.catererAuthenticated}
          caterer
        />
        <main>{orders}</main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const orders = [];
  state.orders.catererOrders.forEach(order => {
    orders.push({
      id: order.id,
      user: order.user.name,
      meals: JSON.parse(order.order),
      date: new Date(order.createdAt).toDateString(),
      total: order.total
    });
  });
  return {
    catererAuthenticated: state.auth.catererAuthenticated,
    loading: state.orders.loading,
    orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.orderFetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererOrderHistory, client));
