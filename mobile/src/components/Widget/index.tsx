import React, { useRef, useState } from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Success } from '../Success';
import { Copyright } from '../Copyright';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedbackType() {
    setFeedbackType(null)
  }

  function handleFeedbackSent() {
    setFeedbackSent(true)
  }

  function handleRestartFeedbackSent() {
    setFeedbackSent(false)
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color= {theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet 
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      > 
        {
          feedbackSent ?
            <Success onSendAnotherFeedback={handleRestartFeedbackSent} />
            :
            <>
              {
                feedbackType ?
                  <Form 
                    feedbackType={feedbackType} 
                    onFeedbackCanceled={handleRestartFeedbackType}
                    onFeedbackSent={handleFeedbackSent}
                  />
                :
                <Options onFeedbackTypeChanged={setFeedbackType} />
              }
          </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);