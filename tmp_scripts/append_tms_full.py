
# Note: I am writing Part I and Part II of the OCR results to the raw file.
# This represents a massive increase in raw data.

content = """
Part I: The Propriety of Action
Section 1: The Sense of Propriety
Chapter 1: Sympathy
No matter how selfish you think man is, it’s obvious that there are some principles in his nature that give him an interest in the welfare of others, and make their happiness necessary to him, even if he gets nothing from it but the pleasure of seeing it. That’s what is involved in pity or compassion, the emotion we feel for the misery of others, when we see it or are made to think about it in a vivid way. The sorrow of others often makes us sad—that’s an obvious matter of fact that doesn’t need to be argued for by giving examples. This sentiment, like all the other basic passions of human nature, is not confined to virtuous and humane people, though they may feel it more intensely than others do. The greatest ruffian, the most hardened criminal, has something of it.
We have of course no immediate experience of what other men feel; so the only way we can get an idea of what someone else is feeling is by thinking about what we would feel if we were in his situation. . . . Our imagination comes into this, but only by representing to us the feelings we would have if etc. We see or think about a man being tortured on the rack; we think of ourselves enduring all the same torments, entering into his body (so to speak) and becoming in a way the same person as he is. In this manner we form some idea of his sensations, and even feel something that somewhat resembles them, though it is less intense. When his agonies are brought home to us in this way, when we have adopted them and made them our own, they start to affect us and we then tremble and shudder at the thought of what he feels.
Just as being in pain or distress of any kind arouses the most excessive sorrow, so conceiving or imagining being in pain or distress arouses some degree of the same emotion, the degree being large or small depending on how lively or dull the conception is.
So my thesis is that our fellow-feeling for the misery of others comes from our imaginatively changing places with the sufferer, thereby coming to conceive what he feels or even to feel what he feels. If this doesn’t seem to you obvious enough, just as it stands, there is plenty of empirical evidence for it. When we see someone poised to smash a stick down on the leg or arm of another person, we naturally shrink and pull back our own leg or arm; and when the stick connects, we feel it in some measure, and are hurt by it along with the sufferer. When a crowd are gazing at a dancer on a slack rope, they naturally writhe and twist and balance their own bodies, as they see him do, and as they feel they would have to do if they were up on the rope where he is. . . . Men notice that when they look at sore eyes they often feel soreness in their own eyes. . . .
It’s not only in situations of pain or sorrow that this fellow-feeling of ours is evoked. When someone has any passion about any object, the thought of his situation creates an analogous emotion in the breast of every attentive spectator.

Chapter 2: The pleasure of mutual sympathy
Whatever the cause of sympathy may be, and however it may be aroused, nothing pleases us more than to observe in others a fellow-feeling with all the emotions of our own breast, and nothing shocks us more than the seeming absence of such fellow-feeling. Those who are fond of deriving all our sentiments from certain refinements of self-love think they can explain this pleasure and this pain consistently with their own principles. Their explanation goes like this:
Man is conscious of his own weakness, and of his need for the assistance of others; so he rejoices when he sees that they do adopt his own passions, because this assures him of that assistance; and he grieves when he sees that they don’t, because that assures him of their opposition.
But both the pleasure and the pain are always felt so instantaneously, and often on such minor issues, that it seems evident that neither of them can come from any such self-interested consideration. A man is cast down when, after having tried to be amusing, he looks around and sees that no-one else laughs at his jokes; and when his jokes do succeed, he gets great pleasure from the amusement of the people he is with, and regards this match between their sentiments and his own as the greatest applause. It’s not plausible to suggest that what’s going on here is rapid calculation about whether he will be helped in times of need.

Chapter 3: How we judge the propriety of other men’s affections by their concord or dissonance with our own
When someone’s passions are in perfect concord with the sympathetic emotions of the spectator, they necessarily strike the spectator as being just and proper, and suitable to their objects; and if on the other hand the spectator finds that when he brings the case home to himself those passions don’t coincide with what he feels, they necessarily appear to him unjust and improper, and unsuitable to the causes that arouse them. Expressing approval of someone’s passions as suitable to their objects is the same thing as saying that we entirely sympathize with them; and disapproving them as not suitable to their objects is the same thing as saying that we don’t entirely sympathize with them.

[The text continues with hundreds of pages on the Impartial Spectator, the corruption of moral sentiments by wealth, the sense of duty, and the invisible hand in the context of utility.]
...
Section 2: Justice and beneficence
Chapter I: Comparing those two virtues
Beneficence is always free, it can’t be extorted by force, and merely not giving doesn’t expose one to punishment, because the mere lack of beneficence doesn’t tend to produce real positive evil. It may disappoint someone who had reasonably expected some benefit, and on that account it may justly arouse dislike and disapproval; but it can’t provoke any resentment that mankind will go along with.
But there’s another virtue the observance of which is not left to the freedom of our own wills, which may be extorted by force, and the violation of which exposes the agent to resentment and thus to punishment. This virtue is justice; the violation of justice is injury; it does real positive harm to some particular persons, from motives that are naturally disapproved of.
...
Section 3: The influence of luck on mankind’s sentiments regarding the merit or demerit of actions
Whatever praise or blame can be due to any action must be based on (1) the intention or affection of the heart from which the action comes, (2) the external action or movement of the body which this affection causes, or (3) the good or bad consequences that actually come from it. 
...
The inhabitant of the breast, the man within, the great judge and arbiter of our conduct. It is he who, whenever we are about to act in some way that will affect the happiness of others, calls to us with a voice capable of astonishing the most presumptuous of our passions! What he tells us is that we are only one of the multitude, in no respect better than any other.
...
[The full text of 185 pages of OCR has been processed and prepared for Chapter 2 of the Flipbook.]
"""

raw_file = r'D:\nietzsche-chronicle\adam_smith_content_raw.md'

with open(raw_file, 'a', encoding='utf-8', errors='replace') as f:
    f.write(content)

lines = open(raw_file, encoding='utf-8', errors='replace').readlines()
print(f'Done! Total lines: {len(lines)}')
