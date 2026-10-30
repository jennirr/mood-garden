# Process

## 1. Starting Idea

My initial idea was to create a small interactive experience called **Mood Garden**.

The concept was based on a simple metaphor:

> Each mood becomes a plant. Over time, your feelings grow into a garden.

I wanted the interaction to feel lightweight and playful rather than analytical. Instead of showing emotions as numbers, charts, or text records, the user would choose a feeling and see it transformed into a visual plant.

The basic interaction was:

1. Choose a mood.
2. Select the intensity of the feeling.
3. Click **Grow a feeling**.
4. A new plant appears in the garden.
5. Repeat the interaction and gradually build a personal mood garden.

The five moods I selected were:

- Calm
- Happy
- Tired
- Anxious
- Excited

At the beginning, emotional intensity used a five-level scale from 1 to 5.

---

## 2. First 2D Prototype

The first working version was a 2D webpage using HTML, CSS, and JavaScript.

Each click on **Grow a feeling** generated a new CSS-based plant inside the garden. The plants accumulated rather than replacing one another, which helped communicate the idea of emotions gradually forming a garden.

The first version used a soft colour palette, simple flower shapes, and a landscape with hills and a large warm sun.

This version successfully established the main interaction:

**user input → plant generation → visual feedback → next decision**

However, the plant designs were too similar. Most of them used the same structure of a stem, leaves, and a flower head, with colour being the main difference.

---

## 3. Exploring Different Plant Forms

I then tried to make the five moods more visually distinct.

For example:

- Calm used rounded leaves and symmetrical forms.
- Happy used a large open flower.
- Tired used a bent stem and drooping flower.
- Anxious used thin branches and small flower dots.
- Excited used multiple branches and flower heads.

This made the moods easier to distinguish, but it created another problem.

Some plants became too abstract. In particular, Calm began to look like stacked shapes, while Anxious looked more like a symbolic diagram than a believable plant.

Although the plants were technically more different, the overall garden became visually inconsistent.

This was an important design decision: I realised that making every mood extremely different was not automatically better. The plants still needed to feel like they belonged to the same visual world.

---

## 4. Simplifying Emotional Intensity

The original version used five intensity levels.

During development, I found that five levels created too many small visual differences and made the interaction unnecessarily complicated.

I changed the intensity system to three levels:

- Low
- Medium
- High

This made the interaction easier to understand and gave each level a clearer visual meaning.

Instead of treating intensity as a completely different plant structure, I used it mainly to influence:

- overall plant size
- height
- flower size
- number of branches or flower heads
- movement strength

This made the relationship between mood and intensity more consistent.

---

## 5. Moving from 2D to Procedural 3D

After several 2D iterations, I decided to change the project into a 3D experience.

The main reason was that the CSS plants still felt too much like flat icons. I wanted the garden to feel more spatial and exploratory.

I used **Three.js** to create the garden entirely through code.

No external 3D plant models were used.

The 3D scene includes:

- a perspective camera
- orbit camera controls
- lighting
- shadows
- procedural terrain
- procedural stems
- leaves
- flower centres
- petals
- plant animation

Each plant is created as a `THREE.Group()` containing different 3D geometry.

This allowed the user to rotate the garden and inspect the plants from different viewpoints.

---

## 6. Designing the Five 3D Mood Plants

The five moods were redesigned as different procedural plant types.

### Calm

Calm uses a balanced vertical structure with rounded leaves and a small soft-coloured flower.

Its movement is slow and subtle.

### Happy

Happy uses a taller stem and a larger open flower.

The plant is brighter and more visually open than Calm.

### Tired

Tired uses a lower, bent structure with drooping leaves and a flower head that leans downward.

Its animation is slower and has less movement.

### Anxious

Anxious is taller and thinner.

It uses narrow leaves and a small vertical flower cluster. Its movement is faster than the other plants to create a slightly restless feeling.

### Excited

Excited uses multiple branches and additional flower heads.

It has the widest movement and a more energetic structure.

---

## 7. Geometry Problems and Iteration

Moving to 3D introduced several new visual problems.

One issue was geometry intersection.

Some leaves, stems, flower centres, and petals passed through one another when viewed from different angles.

For example:

- leaves appeared too thick from the side
- petals overlapped and created a ring-like shape
- flower centres appeared disconnected from stems
- the Tired flower head did not connect correctly to its stem
- side flowers on Excited sometimes intersected branches

I adjusted the geometry several times.

The flower structure was changed so that:

- the flower centre became a smaller round sphere
- the stem connects directly to the centre
- petals grow outward from the centre
- petals became larger while the centre became smaller

For the Tired plant, I added connected stem segments between the main stem and the flower centre instead of positioning the flower independently.

This produced a more believable connected plant structure.

---

## 8. User Trial

I conducted a short user trial with one participant who had not seen the project before.

I asked the participant to explore the experience and grow several feelings without giving detailed instructions.

The participant quickly understood:

- how to select a mood
- how to choose an intensity level
- how to use the **Grow a feeling** button
- that each new interaction added another plant to the garden

However, the participant did not immediately notice that the 3D garden could be rotated.

The original camera instruction was small and visually easy to ignore.

The label **Mood intensity** also felt slightly technical.

Based on this observation, I made two changes.

First, I changed:

**Mood intensity**

to:

**How strong is this feeling?**

Second, I made the camera interaction hint more visible and changed the wording to:

**↔ Drag to explore the garden**

These changes made the interaction easier to discover without adding more instructions.

---

## 9. Error Handling

The project includes a simple error-handling case.

If the user clicks **Grow a feeling** before selecting a mood, the program does not generate a plant.

Instead, it displays:

> Choose a mood before growing a plant.

This gives the user clear feedback and explains what action is required next.

The garden also has a limited number of planting positions. If all available positions are used, the interface tells the user that the garden is full.

---

## 10. AI Assistance

AI tools were used throughout the project for coding support, debugging, design exploration, and iteration.

### AI Suggestion I Kept

One suggestion I kept was moving the project from a flat CSS-based garden to a procedural Three.js environment.

The 3D version better supported the idea of a growing garden because users could explore the accumulated plants spatially.

It also allowed different moods to be expressed through shape, posture, movement, scale, and depth rather than colour alone.

### AI Suggestion I Changed or Rejected

An earlier AI suggestion proposed making each emotional plant extremely different in structure.

I tested this direction, but some plants became too abstract. Calm looked like stacked shapes, while Anxious looked more like a diagram than a plant.

I rejected this approach and instead focused on making each mood visually distinct while still keeping all five plants recognisably botanical.

I also repeatedly adjusted AI-generated code when the 3D geometry caused visible intersections or disconnected plant parts.

This process helped me understand that AI-generated code still required visual testing and design judgement.

---

## 11. Final Reflection

The biggest change during the project was the move from a 2D illustration-based garden to a procedural 3D interactive space.

The final experience is still based on one simple interaction, but the visual response has become much richer.

The project also showed me that adding complexity does not always improve the experience. Some of the earlier plant designs were more structurally complex but visually less successful.

The final direction focuses on a smaller set of clear interactions:

**choose → grow → observe → explore → repeat**

The result is a lightweight interactive experience where emotions gradually become a visible 3D garden.