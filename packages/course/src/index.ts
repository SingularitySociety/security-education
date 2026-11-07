import { passwordsCourse } from "./courses/passwords.ts";
import { phishingCourse } from "./courses/phishing.ts";
import { phoneScamsCourse } from "./courses/phoneScams.ts";
import { bossImpersonationCourse } from "./courses/bossImpersonation.ts";
import { hiringAttacksCourse } from "./courses/hiringAttacks.ts";
import { smishingCourse } from "./courses/smishing.ts";
import { onlineScamsCourse } from "./courses/onlineScams.ts";
import { outsideWorkCourse } from "./courses/outsideWork.ts";
import { aiPromptInjectionCourse } from "./courses/aiPromptInjection.ts";
import { aiDataAndToolsCourse } from "./courses/aiDataAndTools.ts";
import { pasteCommandsCourse } from "./courses/pasteCommands.ts";
import { installSourcesCourse } from "./courses/installSources.ts";
import { patchingCourse } from "./courses/patching.ts";
import { dataDisposalCourse } from "./courses/dataDisposal.ts";
import { accountLifecycleCourse } from "./courses/accountLifecycle.ts";
import { snsPostingCourse } from "./courses/snsPosting.ts";
import { targetedAttacksCourse } from "./courses/targetedAttacks.ts";
import { supportDeskIdentityCourse } from "./courses/supportDeskIdentity.ts";
import { stopAndAskCourse } from "./courses/stopAndAsk.ts";
import { deviceBasicsCourse } from "./courses/deviceBasics.ts";
import { emailBeforeSendCourse } from "./courses/emailBeforeSend.ts";
import { personalInfoCourse } from "./courses/personalInfo.ts";
import { fileSharingCourse } from "./courses/fileSharing.ts";
import { kidsGamesCourse } from "./courses/kidsGames.ts";
import { fileExchangeCourse } from "./courses/fileExchange.ts";
import { homeNetworkCourse } from "./courses/homeNetwork.ts";
import { incidentFirstResponseCourse } from "./courses/incidentFirstResponse.ts";
import { backupRecoveryCourse } from "./courses/backupRecovery.ts";
import { suppliersCourse } from "./courses/suppliers.ts";
import { insiderThreatCourse } from "./courses/insiderThreat.ts";
import { itInventoryCourse } from "./courses/itInventory.ts";
import { itEnvironmentCourse } from "./courses/itEnvironment.ts";
import { loggingBasicsCourse } from "./courses/loggingBasics.ts";
import { cloudBasicsCourse } from "./courses/cloudBasics.ts";
import { webAppSecurityCourse } from "./courses/webAppSecurity.ts";
import { apiSecurityCourse } from "./courses/apiSecurity.ts";
import { secureDesignCourse } from "./courses/secureDesign.ts";
import { intrusionDetectionCourse } from "./courses/intrusionDetection.ts";
import { forensicsCourse } from "./courses/forensics.ts";
import { fakePoliceCourse } from "./courses/fakePolice.ts";
import { browserDataTheftCourse } from "./courses/browserDataTheft.ts";
import { mfaMethodsCourse } from "./courses/mfaMethods.ts";
import { authSessionsTokensCourse } from "./courses/authSessionsTokens.ts";
import { masterAccountCourse } from "./courses/masterAccount.ts";
import { chatImpersonationCourse } from "./courses/chatImpersonation.ts";
import { businessSnsTakeoverCourse } from "./courses/businessSnsTakeover.ts";
import { aiVoiceImpersonationCourse } from "./courses/aiVoiceImpersonation.ts";
import { financialSupportTakeoverCourse } from "./courses/financialSupportTakeover.ts";
import { realtimePhishingCourse } from "./courses/realtimePhishing.ts";
import { investmentRomanceScamsCourse } from "./courses/investmentRomanceScams.ts";
import { fakeSideJobsCourse } from "./courses/fakeSideJobs.ts";
import { emailTakeoverAbuseCourse } from "./courses/emailTakeoverAbuse.ts";
import { supplyChainBreachCourse } from "./courses/supplyChainBreach.ts";
import { ransomwareBeforeEncryptionCourse } from "./courses/ransomwareBeforeEncryption.ts";
import { afterDataLeakCourse } from "./courses/afterDataLeak.ts";
import { incidentReportingCourse } from "./courses/incidentReporting.ts";
import { shoppingSiteScamsCourse } from "./courses/shoppingSiteScams.ts";
import { mobileAppsPaymentsCourse } from "./courses/mobileAppsPayments.ts";
import { exposedEntryPointsCourse } from "./courses/exposedEntryPoints.ts";
import { ddosContinuityCourse } from "./courses/ddosContinuity.ts";
import { aiAgentsAtWorkCourse } from "./courses/aiAgentsAtWork.ts";
import { trackingStalkerwareCourse } from "./courses/trackingStalkerware.ts";
import { sextortionCourse } from "./courses/sextortion.ts";
import { digitalLegacyCourse } from "./courses/digitalLegacy.ts";
import { secretsInCodeCourse } from "./courses/secretsInCode.ts";
import { protectParentsCourse } from "./courses/protectParents.ts";
import { browserExtensionsCourse } from "./courses/browserExtensions.ts";
import { fakeBillingCourse } from "./courses/fakeBilling.ts";
import { p2pTradeScamsCourse } from "./courses/p2pTradeScams.ts";
import { fakeJobOffersCourse } from "./courses/fakeJobOffers.ts";
import type { Course } from "./types.ts";

export type * from "./types.ts";
export * from "./scoring.ts";
export * from "./progress.ts";
export * from "./playback.ts";
export * from "./drawQuiz.ts";
export * from "./reviewPoints.ts";
export * from "./categories.ts";
export * from "./videoDuration.ts";
export * from "./checklist.ts";
export * from "./checklistProgress.ts";

export const courses: readonly Course[] = [
  passwordsCourse,
  phishingCourse,
  smishingCourse,
  phoneScamsCourse,
  bossImpersonationCourse,
  hiringAttacksCourse,
  onlineScamsCourse,
  outsideWorkCourse,
  pasteCommandsCourse,
  installSourcesCourse,
  aiPromptInjectionCourse,
  aiDataAndToolsCourse,
  patchingCourse,
  dataDisposalCourse,
  accountLifecycleCourse,
  snsPostingCourse,
  targetedAttacksCourse,
  supportDeskIdentityCourse,
  stopAndAskCourse,
  deviceBasicsCourse,
  emailBeforeSendCourse,
  personalInfoCourse,
  fileSharingCourse,
  kidsGamesCourse,
  fileExchangeCourse,
  homeNetworkCourse,
  incidentFirstResponseCourse,
  backupRecoveryCourse,
  suppliersCourse,
  insiderThreatCourse,
  itInventoryCourse,
  itEnvironmentCourse,
  loggingBasicsCourse,
  cloudBasicsCourse,
  webAppSecurityCourse,
  apiSecurityCourse,
  secureDesignCourse,
  intrusionDetectionCourse,
  forensicsCourse,
  fakePoliceCourse,
  browserDataTheftCourse,
  mfaMethodsCourse,
  authSessionsTokensCourse,
  masterAccountCourse,
  chatImpersonationCourse,
  businessSnsTakeoverCourse,
  aiVoiceImpersonationCourse,
  financialSupportTakeoverCourse,
  realtimePhishingCourse,
  investmentRomanceScamsCourse,
  fakeSideJobsCourse,
  emailTakeoverAbuseCourse,
  supplyChainBreachCourse,
  ransomwareBeforeEncryptionCourse,
  afterDataLeakCourse,
  incidentReportingCourse,
  shoppingSiteScamsCourse,
  mobileAppsPaymentsCourse,
  exposedEntryPointsCourse,
  ddosContinuityCourse,
  aiAgentsAtWorkCourse,
  trackingStalkerwareCourse,
  sextortionCourse,
  digitalLegacyCourse,
  secretsInCodeCourse,
  protectParentsCourse,
  browserExtensionsCourse,
  fakeBillingCourse,
  p2pTradeScamsCourse,
  fakeJobOffersCourse,
];

// Written but not yet published: listed as under construction until their videos are rendered.
export const draftCourses: readonly Course[] = [];

export const findCourse = (courseId: string): Course | undefined => courses.find((course) => course.id === courseId);

export const voiceFileName = (courseId: string, sceneId: string): string => `voice/${courseId}/${sceneId}.wav`;

export const videoFileName = (courseId: string): string => `videos/${courseId}.mp4`;
