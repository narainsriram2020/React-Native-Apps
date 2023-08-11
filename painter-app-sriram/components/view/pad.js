import React from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Svg, { G, Path, Circle, Rect } from 'react-native-svg';
import Pen from '../tools/pen';
import Point from '../tools/point';
import {Ionicons, Materialicons} from '@expo/vector-icons'

export default class Pad extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      tracker: 0,
      currentPoints: [],
      previousStrokes: [],
      pen: new Pen(),
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => true,
      onMoveShouldSetPanResponder: (evt, gs) => true,
      onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
      onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
      onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs),
    });
    const rewind = props.rewind || function () {};
    const clear = props.clear || function () {};
    this._clientEvents = {
      rewind: rewind(this.rewind),
      clear: clear(this.clear),
    };
  }

  componentDidMount() {
    if (this.props.strokes) this.setState({ strokes: this.props.strokes });
  }

  componentDidUpdate() {
    if (
      this.props.enabled == false &&
      this.props.strokes !== undefined &&
      this.props.strokes.length !== this.state.previousStrokes.length
    )
      this.setState({
        previousStrokes: this.props.strokes || this.state.previousStrokes,
      });
  }

  rewind = () => {
    if (
      this.state.currentPoints.length > 0 ||
      this.state.previousStrokes.length < 1
    )
      return;
    let strokes = this.state.previousStrokes;
    strokes.pop();

    this.state.pen.rewindStroke();

    this.setState({
      previousStrokes: [...strokes],
      currentPoints: [],
      tracker: this.state.tracker - 1,
    });

    this._onChangeStrokes([...strokes]);
  };

  clear = () => {
    this.setState({
      previousStrokes: [],
      currentPoints: [],
      tracker: 0,
    });
    this.state.pen.clear();
    this._onChangeStrokes([]);
  };

  onTouch(evt) {
    if (this.props.enabled == false) return;
    let x, y, timestamp, color, shape, strokeWidth, fill;
    [x, y, timestamp, color, shape, strokeWidth, fill] = [
      evt.nativeEvent.locationX,
      evt.nativeEvent.locationY,
      evt.nativeEvent.timestamp,
      this.props.color,
      this.props.shape,
      this.props.fill,
      this.props.strokeWidth
    ];

    let newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({ x, y, timestamp, color, shape, strokeWidth, fill });

    this.setState({
      previousStrokes: this.state.previousStrokes,
      currentPoints: newCurrentPoints,
      tracker: this.state.tracker,
    });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
  }

  onResponderRelease() {
    let strokes = this.state.previousStrokes;
    if (this.state.currentPoints.length < 1) return;

    var points = this.state.currentPoints;

    this.state.pen.addStroke(this.state.currentPoints);

    this.setState({
      previousStrokes: [...strokes, points],
      strokes: [],
      currentPoints: [],
      tracker: this.state.tracker + 1,
    });
    this._onChangeStrokes([...strokes, points]);
  }

  _onLayoutContainer = (e) => {
    this.state.pen.setOffset(e.nativeEvent.layout);
  };

  _onChangeStrokes = (strokes) => {
    if (this.props.onChangeStrokes) this.props.onChangeStrokes(strokes);
  };

  render() {
    var props =
      this.props.enabled != false ? this._panResponder.panHandlers : {};

    return (
      <View
        onLayout={this._onLayoutContainer}
        style={[styles.drawContainer, this.props.containerStyle]}>
        <TouchableOpacity
          onPress={() => {
            this.clear();
          }}
          style={{ marginTop: -90, marginLeft: '20%', marginRight: '70%', fontSize: 1, backgroundColor: 'white' }}>
          <Text>🗑️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.rewind();
          }}
          style={{ height: '-30%', marginLeft: '80%', fontSize: 100, marginTop: -16, backgroundColor: 'white' }}>
          <Text>🔙</Text>
        </TouchableOpacity>
        <View style={styles.svgContainer} {...props}>
          <Svg style={styles.drawSurface}>
            <G>
              {this.state.previousStrokes.map((e) => {
                var points = [];
                for (var i in e) {
                  let newPoint = new Point(e[i].x, e[i].y, e[i].timestamp, e[i].color, e[i].shape, e[i].strokeWidth, e[i].fill);
                  points.push(newPoint);
                }
                let shape = points[points.length - 1].getShape()
                console.log(shape)
                let color = points[points.length - 1].getColor()
                let strokeWidth = points[points.length - 1].getStrokeWidth()
                if (e[i].shape == "circle"){
                  console.log(shape)
                  return (
                    <Circle
                    key = {e[i].timestamp}
                    stroke = {color || "#000000"}
                    strokeWidth = {strokeWidth || 20}
                    cx = {points[0].x}
                    cy = {points[0].y}
                    fill = {color}
                    r={Math.sqrt(Math.pow(points[points.length - 1].x - points[0].x, 2) + Math.pow(points[points.length - 1].y - points[0].y, 2))}
                    />
                  )
                } 
                else if (e[i].shape == "rectangle"){
                  return(
                    <Rect
                      key = {e[i].timestamp}
                      stroke = {e[i].color || "#000000"}
                      strokeWidth = {strokeWidth || 20}
                      x = {points[0].x}
                      y = {points[0].y}
                      fill = {e[0].color}
                      width = {points[points.length - 1].x - points[0].x}
                      height = {points[points.length - 1].y - points[0].y}
                      
                    />
                  )
                }
                else {
                  return (
                  <Path
                    key={e[0].timestamp}
                    d={this.state.pen.pointsToSvg(points)}
                    stroke={color || this.props.color}
                    strokeWidth={strokeWidth || 20}
                    fill="none"
                  />        
                );}
              })}            
            </G>
          </Svg>
          {this.props.children}
        </View>  
        <View style={{alignSelf: 'flex-start', left: 25, bottom: 50, backgroundColor: 'white'}}>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  drawContainer: {
    flex: 1,
    display: 'flex',
  },
  svgContainer: {
    flex: 1,
  },
  drawSurface: {
    flex: 1,
  },
})
