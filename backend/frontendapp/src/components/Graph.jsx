import React, { Component } from 'react';
import {
  LineChart, Line, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer,
} from 'recharts';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import RCTooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { getData } from '../actions/data';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


function Graph(props) {
  const { data, getData } = props;

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  const Handle = Slider.Handle;

  const handle = (props) => {
    const {
      value, dragging, index, ...restProps
    } = props;
    return (
      <RCTooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </RCTooltip>
    );
  };
  return (
    <Container fluid="True">
      <Row className="show-grid" style={{ marginBottom: 25 }}>
        <Col md={8} className="border border-dark border-right-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Legend verticalAlign="top" height={36} />
              <Line name="BTC-Price" type="monotone" dataKey="price_close" stroke="#8884d8" />
              <Line name="Linear Regression" type="monotone" dataKey="linear_reg" stroke="#82ca9d" />
              <XAxis dataKey="time_close" domain={['auto', 'auto']} />
              <YAxis dataKey="price_close" domain={['auto', 'auto']} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col md={4} className="border border-dark rounded">
          <Row className="show-grid p-5" style={{ marginBottom: 50 }}>
            <b> Hours from now </b>
            <Slider
              min={10}
              max={50}
              defaultValue={10}
              marks={{
                10: 10, 15: 15, 25: 25, 50: 50,
              }}
              step={null}
              handle={handle}
              onChange={(value) => {
                getData(value);
              }}
            />
          </Row>
          <Row className="show-grid p-5" style={{ marginBottom: 50 }}>
            <Form>
              {['Linear', 'Decision Tree'].map(type => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={`Include ${type}`}
                  />
                </div>
              ))}
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (timedelta) => {
      dispatch(getData(timedelta));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
