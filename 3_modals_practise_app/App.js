import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';

const Stack = createNativeStackNavigator();

const screenThemes = {
  Home: {
    accent: '#d46a4d',
    soft: '#f6e3da',
    title: 'Welcome Modal',
    subtitle: 'A calm intro card for the first screen.',
    description:
      'This modal is focused on simple presentation content with a strong call-to-action.',
    button: 'Open welcome modal',
    modalButton: 'Close modal',
  },
  Details: {
    accent: '#287271',
    soft: '#dff3f0',
    title: 'Profile Form',
    subtitle: 'A Formik-powered form lives in this modal.',
    description:
      'Use this screen to collect a short profile with Formik-managed values.',
    button: 'Open form modal',
    modalButton: 'Submit form',
  },
  Summary: {
    accent: '#6c4ab6',
    soft: '#ece6fb',
    title: 'Quick Summary',
    subtitle: 'A compact recap modal on the third screen.',
    description:
      'This modal shows a final confirmation-style message before users loop back.',
    button: 'Open summary modal',
    modalButton: 'Dismiss',
  },
};

function AppButton({ label, onPress, tone = '#1f2937', filled = true }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        filled ? { backgroundColor: tone } : { borderWidth: 1, borderColor: tone },
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonLabel, !filled && { color: tone }]}>{label}</Text>
    </Pressable>
  );
}

function ModalShell({ visible, onClose, accent, soft, title, subtitle, children }) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.modalCard, { borderTopColor: accent, backgroundColor: '#fffdf9' }]}>
          <View style={[styles.modalBanner, { backgroundColor: soft }]}>
            <Text style={[styles.modalTitle, { color: accent }]}>{title}</Text>
            <Text style={styles.modalSubtitle}>{subtitle}</Text>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

function ScreenLayout({ navigation, route, routeName, headline, body, nextScreen }) {
  const theme = screenThemes[routeName];
  const [visible, setVisible] = useState(false);
  const submittedProfile = route?.params?.profile ?? null;

  const summaryText = useMemo(() => {
    if (!submittedProfile) {
      return 'No profile submitted yet. Open the form modal on the second screen to save one.';
    }

    return `${submittedProfile.name} is learning ${submittedProfile.course} in semester ${submittedProfile.semester}.`;
  }, [submittedProfile]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroCard, { backgroundColor: theme.soft }]}>
          <Text style={[styles.eyebrow, { color: theme.accent }]}>{routeName} Screen</Text>
          <Text style={styles.screenTitle}>{headline}</Text>
          <Text style={styles.screenBody}>{body}</Text>
        </View>

        <View style={styles.stackGap}>
          <AppButton label={theme.button} onPress={() => setVisible(true)} tone={theme.accent} />
          <AppButton
            label={`Go to ${nextScreen}`}
            onPress={() => navigation.navigate(nextScreen)}
            tone={theme.accent}
            filled={false}
          />
        </View>

        {routeName === 'Summary' ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Latest submitted profile</Text>
            <Text style={styles.summaryText}>{summaryText}</Text>
          </View>
        ) : null}
      </ScrollView>

      {routeName === 'Home' ? (
        <ModalShell
          visible={visible}
          onClose={() => setVisible(false)}
          accent={theme.accent}
          soft={theme.soft}
          title={theme.title}
          subtitle={theme.subtitle}
        >
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>{theme.description}</Text>
            <AppButton label={theme.modalButton} onPress={() => setVisible(false)} tone={theme.accent} />
          </View>
        </ModalShell>
      ) : null}

      {routeName === 'Details' ? (
        <ModalShell
          visible={visible}
          onClose={() => setVisible(false)}
          accent={theme.accent}
          soft={theme.soft}
          title={theme.title}
          subtitle={theme.subtitle}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalBody}
          >
            <Formik
              initialValues={{ name: '', course: '', semester: '' }}
              onSubmit={(values, { resetForm }) => {
                resetForm();
                setVisible(false);
                navigation.navigate('Summary', { profile: values });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formGap}>
                  <Text style={styles.modalText}>{theme.description}</Text>
                  <TextInput
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Course"
                    value={values.course}
                    onChangeText={handleChange('course')}
                    onBlur={handleBlur('course')}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Semester"
                    value={values.semester}
                    onChangeText={handleChange('semester')}
                    onBlur={handleBlur('semester')}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <AppButton label={theme.modalButton} onPress={handleSubmit} tone={theme.accent} />
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ModalShell>
      ) : null}

      {routeName === 'Summary' ? (
        <ModalShell
          visible={visible}
          onClose={() => setVisible(false)}
          accent={theme.accent}
          soft={theme.soft}
          title={theme.title}
          subtitle={theme.subtitle}
        >
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>{theme.description}</Text>
            <Text style={styles.summaryText}>{summaryText}</Text>
            <AppButton label={theme.modalButton} onPress={() => setVisible(false)} tone={theme.accent} />
          </View>
        </ModalShell>
      ) : null}
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  return (
    <ScreenLayout
      navigation={navigation}
      route={undefined}
      routeName="Home"
      headline="Three-screen modal practice"
      body="Start with a welcome modal, move to a form modal, and finish on a summary modal."
      nextScreen="Details"
    />
  );
}

function DetailsScreen({ navigation, route }) {
  return (
    <ScreenLayout
      navigation={navigation}
      route={route}
      routeName="Details"
      headline="Modal with a Formik form"
      body="This screen contains the required form modal so users can enter profile details."
      nextScreen="Summary"
    />
  );
}

function SummaryScreen({ navigation, route }) {
  return (
    <ScreenLayout
      navigation={navigation}
      route={route}
      routeName="Summary"
      headline="Final modal recap"
      body="Use the third screen to show a final modal and keep the navigation loop moving."
      nextScreen="Home"
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fffaf4' },
          headerTitleStyle: { fontWeight: '700', color: '#1f2937' },
          contentStyle: { backgroundColor: '#f4efe6' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4efe6',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    marginTop: 12,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 12,
  },
  screenBody: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  stackGap: {
    gap: 12,
  },
  button: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(21, 24, 33, 0.35)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopWidth: 6,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 18,
    minHeight: '48%',
  },
  modalBanner: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },
  modalBody: {
    paddingHorizontal: 22,
    paddingTop: 18,
    gap: 18,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    fontSize: 15,
    color: '#111827',
  },
  formGap: {
    gap: 14,
  },
  summaryCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#eadfce',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
  },
});
