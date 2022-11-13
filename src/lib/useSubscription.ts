import { useSelector } from "react-redux";
import { selectStripeSubscription, selectStripeSubscriptionLoading } from "../features/stripe/stripeSlice";

export default function useSubscription() {
    const subscription = useSelector(selectStripeSubscription);
    const subscriptionStatusLoading = useSelector(selectStripeSubscriptionLoading)
    const isSubscribed = subscription?.subscriptionObject?.status == "active"
    return { isSubscribed, subscription }
}