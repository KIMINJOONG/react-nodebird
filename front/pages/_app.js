import React from "react";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga'; // 서버사이드렌더링시 필수
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers";
import AppLayout from "../components/AppLayout";
import rootSaga from "../sagas";
import createSagaMiddleware from "@redux-saga/core";
import { LOAD_USER_REQUEST } from "../reducers/user";
import axios from "axios";
import Helmet from 'react-helmet';
import { Container } from 'next/app';

const NodeBird = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet 
          title="NodeBird"
          htmlAttributes={{ lang: 'ko' }}
          meta={[{
            charSet: 'UTF-8'
          }, {
            name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: '제로초의 NodeBird SNS'
          }, {
            name: 'og:title', content: 'NodeBird'
          },{
            property: 'og:type', content: 'website',
          }]}
          link={[{
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css'
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          }, {
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          }]}
          script={[{
            src: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js'
          }]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
    
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
  pageProps: PropTypes.object.isRequired
};

NodeBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  
  const state = ctx.store.getState();
  //서버에서 한번 클라이언트에서 한번 실행하기때문에 분기처리 필수
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if(ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if(!state.user.me){
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
  
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga); // 이부분도 서버사이드 렌더링
  return store;
};

export default withRedux(configureStore)(withReduxSaga(NodeBird)); //서버사이드 렌더링 withReduxSaga추가
