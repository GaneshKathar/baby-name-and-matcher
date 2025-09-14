# 🔮 Numerology Compatibility Calculation Guide

## Overview

This document provides a comprehensive explanation of how compatibility is calculated in our numerology calculator. The system uses traditional numerology principles to determine the compatibility between a person's name and their birth date numbers.

## Core Components

### 1. Mulank (Day Number)
The **Mulank** is calculated from the day of birth by summing all digits in the day and reducing to a single digit.

**Formula:**
- Extract the day from birth date (DD/MM/YYYY format)
- Sum all digits in the day
- Reduce to single digit by repeatedly summing digits until result is 1-9

**Examples:**
- Born on 5th: Mulank = 5
- Born on 27th: 2 + 7 = 9, Mulank = 9
- Born on 29th: 2 + 9 = 11 → 1 + 1 = 2, Mulank = 2

### 2. Bhagyank (Life Path Number)
The **Bhagyank** is calculated from the complete birth date by summing all digits and reducing to a single digit.

**Formula:**
- Take complete birth date (DD/MM/YYYY)
- Remove all non-digit characters
- Sum all individual digits
- Reduce to single digit by repeatedly summing until result is 1-9

**Examples:**
- 27/07/2025: 2+7+0+7+2+0+2+5 = 25 → 2+5 = 7, Bhagyank = 7
- 15/08/1990: 1+5+0+8+1+9+9+0 = 33 → 3+3 = 6, Bhagyank = 6

### 3. Name Number
The **Name Number** is calculated using traditional numerology letter-to-number mapping.

**Letter Values:**
- **1**: A, I, J, Q, Y
- **2**: B, K, R
- **3**: C, G, L, S
- **4**: D, M, T
- **5**: E, H, N, X
- **6**: U, V, W
- **7**: O, Z
- **8**: F, P

**Process:**
1. Convert name to uppercase
2. Remove all non-alphabetic characters
3. Map each letter to its corresponding number
4. Sum all values
5. Reduce to single digit (1-9)

**Example:**
- Name: "JOHN"
- J(1) + O(7) + H(5) + N(5) = 18
- 18 → 1+8 = 9, Name Number = 9

## Compatibility Matrix

The compatibility system uses a predefined matrix that defines relationships between numbers as **Friendly**, **Enemy**, or **Neutral**.

### Complete Compatibility Matrix

| Name Number | Friendly Numbers | Enemy Numbers | Neutral Numbers |
|-------------|------------------|---------------|-----------------|
| **1** | 1, 2, 3, 5, 6, 9 | 8 | 4, 7 |
| **2** | 1, 2, 3, 5 | 4, 8, 9 | 6, 7 |
| **3** | 1, 2, 3, 5, 7 | 6 | 4, 8, 9 |
| **4** | 1, 4, 5, 6, 7, 8 | 2, 9 | 3 |
| **5** | 1, 2, 3, 5, 6 | (none) | 4, 7, 8, 9 |
| **6** | 1, 4, 5, 6, 7 | 3 | 2, 8, 9 |
| **7** | 1, 3, 4, 5, 6 | 2 | 7, 8, 9 |
| **8** | 3, 4, 5, 6, 7, 8 | 1, 2 | 9 |
| **9** | 1, 3, 5 | 2, 4 | 6, 7, 8, 9 |

## Compatibility Calculation Algorithm

The compatibility percentage is determined by analyzing the relationship between the **Name Number** and both the **Mulank** and **Bhagyank**.

### Step-by-Step Process

1. **Calculate all three numbers** (Name Number, Mulank, Bhagyank)
2. **Look up the Name Number** in the compatibility matrix
3. **Check relationships:**
   - Is Mulank friendly with Name Number?
   - Is Bhagyank friendly with Name Number?
   - Is Mulank neutral with Name Number?
   - Is Bhagyank neutral with Name Number?
4. **Apply compatibility rules** to determine percentage

### Compatibility Rules

#### 🎯 Perfect Match (100%)
**Condition:** Both Mulank AND Bhagyank are in the "friendly" list of the Name Number

**Example:**
- Name Number: 1
- Mulank: 2 (friendly with 1)
- Bhagyank: 3 (friendly with 1)
- Result: 100% - "Perfect Match! Both Mulank and Bhagyank are friendly with your name number."

#### ⚖️ grate Match (75%)
**Condition:** One number is friendly AND the other is neutral

**Scenarios:**
- Mulank is friendly + Bhagyank is neutral
- Mulank is neutral + Bhagyank is friendly

#### 🔸  fair Match (50%)
**Condition:** Both Mulank AND Bhagyank are in the "neutral" list

#### 🔸 poor Match (25%)
**Condition:** one number in enemy and one in friendly or neutral


#### 🔸 No Match (0%)
**Condition:** Any other combination (typically involving enemy relationships)



## Key Features

- **Real-time Calculation:** Results update instantly as you type
- **Batch Processing:** Calculate multiple names against one birth date
- **Filtering & Sorting:** Filter results by match type and sort by percentage
- **Mobile Responsive:** Works seamlessly on all devices
- **Traditional Principles:** Based on established numerology practices

## Validation

The system includes comprehensive validation:
- Date format validation (DD/MM/YYYY)
- Name input sanitization (removes non-alphabetic characters)
- Error handling for invalid inputs
- Comprehensive test suite covering all calculation scenarios

---

*This compatibility system is based on traditional numerology principles and is intended for entertainment and self-reflection purposes.*
