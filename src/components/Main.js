import React from 'react'
import LeftSider from 'components/LeftSider'
import RightSider from 'components/RightSider'
import RightProps from 'components/RightProps'
import Canvas from 'components/canvas'
import 'assets/base.scss'
import './main.scss'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.state = {
      data,
      frameData: data.document.children[0].children[0],
      components: data.components,
      frameId: '',
      elementData: null,
      propsDissolved: true
    }
  }
  handleSelectFrame = (pageIndex, currentFrameId) => {
    const { onNamesChange } = this.props
    const { data, frameId } = this.state
    if (frameId===currentFrameId) return
    const currentPage = data.document.children[pageIndex]
    const frameData = currentPage.children
      .find(frame => frame.id===currentFrameId)
    this.setState({
      frameId: currentFrameId,
      frameData
    })
    onNamesChange && onNamesChange(currentPage.name, frameData.name)
    this.handleDeselect()
  }
  handleSelectElement = elementData => {
    this.setState({
      elementData,
      propsDissolved: false
    })
  }
  handleDeselect = () => {
    this.setState({ propsDissolved: true })
  }
  handleDissolveEnd = () => {
    this.setState({ elementData: null })
  }
  render () {
    const { data, frameId, components, frameData, elementData, propsDissolved } = this.state
    return (
      <div className="app-main">
        <LeftSider
          pages={data.document.children}
          components={components}
          onFrameChange={this.handleSelectFrame}
        />
        <Canvas
          frameData={frameData}
          frameId={frameId}
          onSelect={this.handleSelectElement}
          onDeselect={this.handleDeselect}
        />
        <div className="main-right">
          <RightSider hasMask={!propsDissolved}/>
          {
            elementData &&
            <RightProps
              data={elementData}
              dissolved={propsDissolved}
              onDissolveEnd={this.handleDissolveEnd}
            />
          }
        </div>
      </div>
    )
  }
}
