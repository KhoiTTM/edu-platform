import os
import glob

# Map old component paths to new ones
replacements = {
    "'@/components/FlipbookClient'": "'@/components/flipbook/FlipbookClient'",
    '"@/components/FlipbookClient"': '"@/components/flipbook/FlipbookClient"',
    "'@/components/SubjectVolumeTabs'": "'@/components/learning/SubjectVolumeTabs'",
    '"@/components/SubjectVolumeTabs"': '"@/components/learning/SubjectVolumeTabs"',
    "'@/components/LessonListByTopic'": "'@/components/learning/LessonListByTopic'",
    '"@/components/LessonListByTopic"': '"@/components/learning/LessonListByTopic"',
    "'@/components/IELTSSkillsNav'": "'@/components/learning/IELTSSkillsNav'",
    '"@/components/IELTSSkillsNav"': '"@/components/learning/IELTSSkillsNav"',
    "'@/components/StartersWordlistClient'": "'@/components/learning/StartersWordlistClient'",
    '"@/components/StartersWordlistClient"': '"@/components/learning/StartersWordlistClient"',
    "'@/components/StartersLearningEngine'": "'@/components/learning/StartersLearningEngine'",
    '"@/components/StartersLearningEngine"': '"@/components/learning/StartersLearningEngine"',
    "'@/components/Unit3TextbookClient'": "'@/components/learning/Unit3TextbookClient'",
    '"@/components/Unit3TextbookClient"': '"@/components/learning/Unit3TextbookClient"',
    "'@/components/GenericTextbookClient'": "'@/components/learning/GenericTextbookClient'",
    '"@/components/GenericTextbookClient"': '"@/components/learning/GenericTextbookClient"',
    "'@/components/LessonPractice'": "'@/components/learning/LessonPractice'",
    '"@/components/LessonPractice"': '"@/components/learning/LessonPractice"',
    "'@/components/TextbookSection'": "'@/components/learning/TextbookSection'",
    '"@/components/TextbookSection"': '"@/components/learning/TextbookSection"',
    "'@/components/AITeacherChat'": "'@/components/learning/AITeacherChat'",
    '"@/components/AITeacherChat"': '"@/components/learning/AITeacherChat"',
    "'@/components/YouTubeEmbed'": "'@/components/learning/YouTubeEmbed'",
    '"@/components/YouTubeEmbed"': '"@/components/learning/YouTubeEmbed"',
    "'@/components/ListeningClient'": "'@/components/learning/ListeningClient'",
    '"@/components/ListeningClient"': '"@/components/learning/ListeningClient"',
    "'@/components/ReadingClient'": "'@/components/learning/ReadingClient'",
    '"@/components/ReadingClient"': '"@/components/learning/ReadingClient"',
    "'@/components/WritingClient'": "'@/components/learning/WritingClient'",
    '"@/components/WritingClient"': '"@/components/learning/WritingClient"',
    "'@/components/speaking/SpeakingLaunchpad'": "'@/components/learning/speaking/SpeakingLaunchpad'",
    '"@/components/speaking/SpeakingLaunchpad"': '"@/components/learning/speaking/SpeakingLaunchpad"',
    "'@/components/TranscriptLineExpander'": "'@/components/learning/TranscriptLineExpander'",
    '"@/components/TranscriptLineExpander"': '"@/components/learning/TranscriptLineExpander"',
    "'@/components/VocabFlipCard'": "'@/components/learning/VocabFlipCard'",
    '"@/components/VocabFlipCard"': '"@/components/learning/VocabFlipCard"',
    "'@/components/SpeakingFollowUpBox'": "'@/components/learning/SpeakingFollowUpBox'",
    '"@/components/SpeakingFollowUpBox"': '"@/components/learning/SpeakingFollowUpBox"',
    "'@/components/PdfViewer'": "'@/components/flipbook/PdfViewer'",
    '"@/components/PdfViewer"': '"@/components/flipbook/PdfViewer"',

    # Actions path
    "'@/app/(app)/phu-huynh/actions'": "'@/app/(app)/(administration)/phu-huynh/actions'",
    '"@/app/(app)/phu-huynh/actions"': '"@/app/(app)/(administration)/phu-huynh/actions"',
    "'@/app/(app)/luyen-tap/actions'": "'@/app/(app)/(assessment)/luyen-tap/actions'",
    '"@/app/(app)/luyen-tap/actions"': '"@/app/(app)/(assessment)/luyen-tap/actions"',
    "'@/app/(app)/test-assessment/actions'": "'@/app/(app)/(assessment)/test-assessment/actions'",
    '"@/app/(app)/test-assessment/actions"': '"@/app/(app)/(assessment)/test-assessment/actions"',
    "'@/app/(app)/settings/actions'": "'@/app/(app)/(administration)/settings/actions'",
    '"@/app/(app)/settings/actions"': '"@/app/(app)/(administration)/settings/actions"',

    # Relative paths breaking due to +1 depth
    "'../../gamification/XPToast'": "'../../../gamification/XPToast'",
    '"../../gamification/XPToast"': '"../../../gamification/XPToast"',
    "'../../gamification/StreakFlame'": "'../../../gamification/StreakFlame'",
    '"../../gamification/StreakFlame"': '"../../../gamification/StreakFlame"'
}

directory = "d:/Backups/Projects/edu-platform"
types = ('**/*.ts', '**/*.tsx')

files_grabbed = []
for file_type in types:
    files_grabbed.extend(glob.glob(directory + '/' + file_type, recursive=True))

for file_path in files_grabbed:
    if 'node_modules' in file_path or '.next' in file_path:
        continue

    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    new_content = content
    for old, new in replacements.items():
        if old in new_content:
            new_content = new_content.replace(old, new)
            print(f"Fixed {old} -> {new} in {file_path}")

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
