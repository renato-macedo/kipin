import React, {useState} from 'react';
import {List, TouchableRipple, Avatar} from 'react-native-paper';
import {ItemInterface} from 'src/context/types';

// import {Image} from 'react-native';
export default function Item({item: {title, body}}: {item: ItemInterface}) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <TouchableRipple
        onBlur={() => setEditing(false)}
        rippleColor="rgba(0, 0, 0, .32)">
        <List.Item
          title={'Editing ' + title}
          description={body}
          left={props => <List.Icon {...props} icon="folder" />}
        />
      </TouchableRipple>
    );
  }
  return (
    <TouchableRipple
      onLongPress={() => setEditing(true)}
      onPress={() => console.log('Open')}
      rippleColor="rgba(0, 0, 0, .32)">
      <List.Item
        title={title}
        description={body}
        left={() => (
          <List.Icon
            icon={() => (
              <Avatar.Image
                size={48}
                source={{
                  uri:
                    'https://pbs.twimg.com/profile_images/1218784668713213953/1oietDB1_400x400.jpg',
                }}
              />
            )}
          />
        )}
        right={props => <List.Icon {...props} icon="dots-vertical" />}
      />
    </TouchableRipple>
  );
}
