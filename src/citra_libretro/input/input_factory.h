// Copyright Citra Emulator Project / Azahar Emulator Project
// Licensed under GPLv2 or any later version
// Refer to the license.txt file included.

#pragma once

#include "core/frontend/input.h"

namespace LibRetro {

namespace Input {

/// Initializes and registers LibRetro device factories
void Init();

/// Unresisters LibRetro device factories and shut them down.
void Shutdown();

/// Read a single accelerometer axis value from the frontend sensor interface.
float ReadAccelerometerAxis(unsigned sensor_id);

/// Ensure the accelerometer sensor is initialized (acquires interface if needed).
void EnsureSensorsInitialized();

} // namespace Input
} // namespace LibRetro
