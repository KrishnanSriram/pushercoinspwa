import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = { activeItem: 'pushercoins' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='pushercoins' active={activeItem === 'pushercoins'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item
              active={activeItem === 'Pusher.com'}
              onClick={this.handleItemClick}>Pusher.com</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
